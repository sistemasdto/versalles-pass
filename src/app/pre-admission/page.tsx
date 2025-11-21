// =====================================================
// PRE-ADMISSION WIZARD - Demo Mode con Mock Storage
// =====================================================

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth, mockDB, mockStorage, generateUniqueQR } from '@/lib/mock-storage'
import { INSURANCE_PROVIDERS, SURGERY_TYPES, SCHEDULED_SURGERIES, DOCTORS } from '@/lib/demo-data'
import { WizardSteps } from '@/components/WizardSteps'
import { SignaturePad } from '@/components/SignaturePad'
import { DocumentUpload } from '@/components/DocumentUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { personalInfoSchema, surgeryInfoSchema } from '@/lib/validations'
import type { WizardStep, PersonalInfoForm, SurgeryInfoForm, DocumentType, CommonAllergy } from '@/types'

// Alergias comunes para checkboxes
const COMMON_ALLERGIES: { value: CommonAllergy; label: string }[] = [
  { value: 'penicilina', label: 'Penicilina' },
  { value: 'aspirina', label: 'Aspirina' },
  { value: 'latex', label: 'Látex' },
  { value: 'yodo', label: 'Yodo' },
  { value: 'anestesia', label: 'Anestesia' },
  { value: 'sulfa', label: 'Sulfa' },
  { value: 'ninguna', label: 'Ninguna' },
  { value: 'otros', label: 'Otros' },
]

const steps: WizardStep[] = [
  { id: 1, title: 'Datos Personales', description: 'Información básica', icon: 'user', status: 'current' },
  { id: 2, title: 'Información Quirúrgica', description: 'Detalles de cirugía', icon: 'clipboard', status: 'pending' },
  { id: 3, title: 'Documentos', description: 'INE y Seguro', icon: 'file', status: 'pending' },
  { id: 4, title: 'Firma Digital', description: 'Consentimiento', icon: 'pen', status: 'pending' },
]

export default function PreAdmissionPage() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [patientId, setPatientId] = useState<string | null>(null)
  const [admissionId, setAdmissionId] = useState<string | null>(null)

  // Form data
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoForm>({
    full_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    allergies: [],
    allergies_other: '',
    blood_type: '',
    address: '',
    city: 'Guadalajara',
    state: 'Jalisco',
    postal_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    insurance_provider: '',
    insurance_policy_number: '',
  })

  const [surgeryInfo, setSurgeryInfo] = useState<SurgeryInfoForm>({
    use_scheduled: false,
    scheduled_surgery_id: '',
    surgery_type: '',
    surgeon_id: '',
    surgeon_name: '',
    professional_license: '',
    scheduled_date: '',
    scheduled_time: '',
    estimated_duration_hours: 0,
    room_number: '',
    estimated_stay_days: 0,
    notes: '',
  })

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({
    ine: false,
    insurance: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Verificar autenticación
  useEffect(() => {
    async function checkAuth() {
      const user = mockAuth.getCurrentUser()
      if (!user) {
        router.push('/login')
        return
      }
      setUserId(user.id)

      // Cargar datos existentes si ya hay un paciente registrado
      const patient = await mockDB.patients.getByUserId(user.id)

      if (patient) {
        setPatientId(patient.id)
        setPersonalInfo({
          full_name: patient.full_name || '',
          date_of_birth: patient.date_of_birth || '',
          phone: patient.phone || '',
          email: patient.email || '',
          allergies: patient.allergies || [],
          allergies_other: patient.allergies_other || '',
          blood_type: patient.blood_type || '',
          address: patient.address || '',
          city: patient.city || 'Guadalajara',
          state: patient.state || 'Jalisco',
          postal_code: patient.postal_code || '',
          emergency_contact_name: patient.emergency_contact_name || '',
          emergency_contact_phone: patient.emergency_contact_phone || '',
          emergency_contact_relationship: patient.emergency_contact_relationship || '',
          insurance_provider: patient.insurance_provider || '',
          insurance_policy_number: patient.insurance_policy_number || '',
        })
      }
    }
    checkAuth()
  }, [router])

  const handlePersonalInfoSubmit = async () => {
    setErrors({})
    setLoading(true)

    try {
      // Validar con Zod
      const validated = personalInfoSchema.parse(personalInfo)

      // Crear o actualizar paciente
      const patient = await mockDB.patients.upsert({
        id: patientId || undefined,
        user_id: userId!,
        ...validated,
      })

      setPatientId(patient.id)
      setCurrentStep(2)
    } catch (err: any) {
      if (err.errors) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message
        })
        setErrors(fieldErrors)
      } else {
        alert('Error al guardar datos: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSurgeryInfoSubmit = async () => {
    setErrors({})
    setLoading(true)

    try {
      // Validar
      const validated = surgeryInfoSchema.parse(surgeryInfo)

      // Crear admission
      const admission = await mockDB.admissions.create({
        patient_id: patientId!,
        ...validated,
        status: 'pending',
      })

      setAdmissionId(admission.id)
      setCurrentStep(3)
    } catch (err: any) {
      if (err.errors) {
        const fieldErrors: Record<string, string> = {}
        err.errors.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message
        })
        setErrors(fieldErrors)
      } else {
        alert('Error al guardar datos: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentUpload = async (file: File, documentType: DocumentType) => {
    if (!patientId || !admissionId) return

    try {
      // Simular upload
      const fileName = `${documentType}_${Date.now()}_${file.name}`
      const { path } = await mockStorage.upload(`${userId}/${admissionId}/${fileName}`, file)

      // Registrar en la base de datos
      await mockDB.documents.create({
        admission_id: admissionId,
        patient_id: patientId,
        document_type: documentType,
        file_name: fileName,
        file_path: path,
        file_size: file.size,
        mime_type: file.type,
      })

      setUploadedDocs(prev => ({ ...prev, [documentType]: true }))
    } catch (error: any) {
      alert('Error al subir documento: ' + error.message)
      throw error
    }
  }

  const handleDocumentsNext = () => {
    if (!uploadedDocs.ine || !uploadedDocs.insurance) {
      alert('Por favor, suba ambos documentos requeridos (INE y Seguro)')
      return
    }
    setCurrentStep(4)
  }

  const handleSignatureSave = async (signatureData: string) => {
    setLoading(true)

    try {
      // Generar QR único
      const qrCode = generateUniqueQR()

      // Actualizar admission con firma y QR
      await mockDB.admissions.update(admissionId!, {
        signature_data: signatureData,
        consent_signed: true,
        consent_signed_at: new Date().toISOString(),
        status: 'signed',
        qr_code: qrCode,
        consent_pdf_url: `https://demo.versallespass.com/pdfs/${admissionId}.pdf`,
      })

      // Redirigir al dashboard
      router.push('/dashboard')
    } catch (error: any) {
      alert('Error al procesar firma: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Manejar selección de alergias con checkboxes
  const handleAllergyToggle = (allergy: CommonAllergy) => {
    const currentAllergies = [...personalInfo.allergies]

    // Si selecciona "ninguna", limpiar todas las demás
    if (allergy === 'ninguna') {
      setPersonalInfo({
        ...personalInfo,
        allergies: currentAllergies.includes('ninguna') ? [] : ['ninguna'],
        allergies_other: '',
      })
      return
    }

    // Si hay "ninguna" y selecciona otra, quitar "ninguna"
    const filteredAllergies = currentAllergies.filter(a => a !== 'ninguna')

    // Toggle la alergia seleccionada
    if (filteredAllergies.includes(allergy)) {
      setPersonalInfo({
        ...personalInfo,
        allergies: filteredAllergies.filter(a => a !== allergy),
        allergies_other: allergy === 'otros' ? '' : personalInfo.allergies_other,
      })
    } else {
      setPersonalInfo({
        ...personalInfo,
        allergies: [...filteredAllergies, allergy],
      })
    }
  }

  const wizardSteps: WizardStep[] = steps.map((step, index) => ({
    ...step,
    status:
      step.id < currentStep
        ? 'completed'
        : step.id === currentStep
        ? 'current'
        : 'pending',
  }))

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pre-admisión Quirúrgica
          </h1>
          <p className="text-gray-600">
            Complete el formulario paso a paso. Toda la información está protegida.
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="mb-8">
          <WizardSteps steps={wizardSteps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {/* PASO 1: Datos Personales */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Datos Personales</CardTitle>
                <CardDescription>
                  Ingrese su información personal y de contacto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre Completo"
                    value={personalInfo.full_name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, full_name: e.target.value })}
                    error={errors.full_name}
                    required
                  />
                  <Input
                    type="date"
                    label="Fecha de Nacimiento"
                    value={personalInfo.date_of_birth}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, date_of_birth: e.target.value })}
                    error={errors.date_of_birth}
                    required
                  />
                  <Input
                    type="tel"
                    label="Teléfono"
                    placeholder="3312345678"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    error={errors.phone}
                    required
                  />
                  <Input
                    type="email"
                    label="Correo Electrónico"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    error={errors.email}
                    required
                  />
                  {/* Alergias con Checkboxes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Alergias <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {COMMON_ALLERGIES.map((allergy) => (
                        <label
                          key={allergy.value}
                          className="flex items-center gap-2 p-3 rounded-medical border border-gray-300 hover:border-primary-500 cursor-pointer transition-colors bg-white"
                        >
                          <input
                            type="checkbox"
                            checked={personalInfo.allergies.includes(allergy.value)}
                            onChange={() => handleAllergyToggle(allergy.value)}
                            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{allergy.label}</span>
                        </label>
                      ))}
                    </div>
                    {/* Campo de texto para "Otros" */}
                    {personalInfo.allergies.includes('otros') && (
                      <div className="mt-3">
                        <Input
                          label="Especifique otras alergias"
                          placeholder="Describa otras alergias..."
                          value={personalInfo.allergies_other}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, allergies_other: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tipo de Sangre
                    </label>
                    <select
                      value={personalInfo.blood_type}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, blood_type: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-medical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Seleccione</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="A1+">A1+</option>
                      <option value="A1-">A1-</option>
                      <option value="A2+">A2+</option>
                      <option value="A2-">A2-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <Input
                    label="Código Postal"
                    placeholder="44100"
                    value={personalInfo.postal_code}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, postal_code: e.target.value })}
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Dirección"
                      placeholder="Calle, número, colonia"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Contacto de Emergencia</h3>
                  </div>

                  <Input
                    label="Nombre del Contacto"
                    value={personalInfo.emergency_contact_name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_contact_name: e.target.value })}
                    error={errors.emergency_contact_name}
                    required
                  />
                  <Input
                    type="tel"
                    label="Teléfono de Emergencia"
                    placeholder="3312345678"
                    value={personalInfo.emergency_contact_phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_contact_phone: e.target.value })}
                    error={errors.emergency_contact_phone}
                    required
                  />
                  <Input
                    label="Relación"
                    placeholder="Esposo(a), Hijo(a), etc."
                    value={personalInfo.emergency_contact_relationship}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_contact_relationship: e.target.value })}
                    error={errors.emergency_contact_relationship}
                    required
                  />

                  {/* Información de Seguro */}
                  <div className="md:col-span-2 border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Información de Seguro Médico (Opcional)</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Aseguradora
                    </label>
                    <select
                      value={personalInfo.insurance_provider}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, insurance_provider: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-medical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Seleccione...</option>
                      {INSURANCE_PROVIDERS.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </div>

                  {personalInfo.insurance_provider && personalInfo.insurance_provider !== 'Sin seguro (pago directo)' && (
                    <Input
                      label="Número de Póliza"
                      placeholder="ABC-2024-123456"
                      value={personalInfo.insurance_policy_number}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, insurance_policy_number: e.target.value })}
                    />
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handlePersonalInfoSubmit}
                    isLoading={loading}
                    disabled={loading}
                    className="gap-2"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PASO 2: Información Quirúrgica */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Cirugías Pre-programadas */}
              {SCHEDULED_SURGERIES.length > 0 && (
                <Card className="border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white">
                  <CardHeader>
                    <CardTitle className="text-primary-700">🏥 Cirugías Programadas</CardTitle>
                    <CardDescription>
                      Su médico ya ha programado estas cirugías. Seleccione una para continuar o registre una nueva.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {SCHEDULED_SURGERIES.map((scheduled) => {
                        const doctor = DOCTORS.find(d => d.id === scheduled.doctor_id)
                        return (
                          <div
                            key={scheduled.id}
                            onClick={() => {
                              setSurgeryInfo({
                                use_scheduled: true,
                                scheduled_surgery_id: scheduled.id,
                                surgery_type: scheduled.surgery_type,
                                surgeon_id: scheduled.doctor_id,
                                surgeon_name: scheduled.doctor_name,
                                professional_license: scheduled.professional_license,
                                scheduled_date: scheduled.scheduled_date,
                                scheduled_time: scheduled.scheduled_time,
                                estimated_duration_hours: scheduled.estimated_duration_hours,
                                room_number: scheduled.room_number,
                                estimated_stay_days: scheduled.estimated_stay_days,
                                notes: '',
                              })
                            }}
                            className={`p-4 rounded-medical border-2 cursor-pointer transition-all ${
                              surgeryInfo.scheduled_surgery_id === scheduled.id
                                ? 'border-navy-500 bg-navy-50 shadow-md'
                                : 'border-gray-300 hover:border-primary-500 hover:shadow-sm bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-navy-700 text-lg mb-1">
                                  {scheduled.surgery_name}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  <span className="font-medium">{doctor?.full_name}</span> • {doctor?.specialty}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                  <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                                    📅 {new Date(scheduled.scheduled_date).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                  </span>
                                  <span className="px-2 py-1 bg-gold-100 text-gold-700 rounded-full">
                                    🏥 Habitación {scheduled.room_number}
                                  </span>
                                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                                    ⏱️ {scheduled.estimated_duration_hours}h estimadas
                                  </span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                    🛏️ {scheduled.estimated_stay_days} días de estancia
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  Cédula Profesional: {scheduled.professional_license}
                                </p>
                              </div>
                              {surgeryInfo.scheduled_surgery_id === scheduled.id && (
                                <div className="ml-4 flex-shrink-0">
                                  <div className="w-6 h-6 bg-navy-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Formulario Manual */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Quirúrgica Manual</CardTitle>
                  <CardDescription>
                    {surgeryInfo.use_scheduled
                      ? 'Puede modificar la información pre-cargada si es necesario'
                      : 'Complete la información de su procedimiento quirúrgico'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tipo de Cirugía - Dropdown */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Tipo de Cirugía <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={surgeryInfo.surgery_type}
                        onChange={(e) => setSurgeryInfo({ ...surgeryInfo, surgery_type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-medical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Seleccione el tipo de cirugía...</option>
                        {SURGERY_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.surgery_type && (
                        <p className="text-red-500 text-xs mt-1">{errors.surgery_type}</p>
                      )}
                    </div>

                    {/* Selección de Doctor */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Cirujano Asignado <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={surgeryInfo.surgeon_id}
                        onChange={(e) => {
                          const doctor = DOCTORS.find(d => d.id === e.target.value)
                          setSurgeryInfo({
                            ...surgeryInfo,
                            surgeon_id: e.target.value,
                            surgeon_name: doctor?.full_name || '',
                            professional_license: doctor?.professional_license || '',
                          })
                        }}
                        className="w-full px-4 py-2.5 rounded-medical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Seleccione un doctor...</option>
                        {DOCTORS.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.full_name} - {doctor.specialty} (Cédula: {doctor.professional_license})
                          </option>
                        ))}
                      </select>
                      {errors.surgeon_name && (
                        <p className="text-red-500 text-xs mt-1">{errors.surgeon_name}</p>
                      )}
                    </div>

                    <Input
                      type="date"
                      label="Fecha Programada"
                      value={surgeryInfo.scheduled_date}
                      onChange={(e) => setSurgeryInfo({ ...surgeryInfo, scheduled_date: e.target.value })}
                      error={errors.scheduled_date}
                      required
                    />
                    <Input
                      type="time"
                      label="Hora Programada"
                      value={surgeryInfo.scheduled_time}
                      onChange={(e) => setSurgeryInfo({ ...surgeryInfo, scheduled_time: e.target.value })}
                    />

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Notas Adicionales
                      </label>
                      <textarea
                        value={surgeryInfo.notes}
                        onChange={(e) => setSurgeryInfo({ ...surgeryInfo, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-medical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Información adicional relevante..."
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </Button>
                    <Button
                      onClick={handleSurgeryInfoSubmit}
                      isLoading={loading}
                      disabled={loading}
                      className="gap-2"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* PASO 3: Documentos */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos Requeridos</CardTitle>
                  <CardDescription>
                    Suba sus documentos en formato PDF, JPG o PNG (máximo 5MB cada uno)
                  </CardDescription>
                </CardHeader>
              </Card>

              <DocumentUpload
                documentType="ine"
                onUpload={handleDocumentUpload}
                existingFile={uploadedDocs.ine ? 'uploaded' : undefined}
              />

              <DocumentUpload
                documentType="insurance"
                onUpload={handleDocumentUpload}
                existingFile={uploadedDocs.insurance ? 'uploaded' : undefined}
              />

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </Button>
                <Button
                  onClick={handleDocumentsNext}
                  disabled={!uploadedDocs.ine || !uploadedDocs.insurance}
                  className="gap-2"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* PASO 4: Firma */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Consentimiento Informado</CardTitle>
                  <CardDescription>
                    Lea y firme el consentimiento para su procedimiento quirúrgico
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none bg-gray-50 p-6 rounded-medical border mb-6 max-h-64 overflow-y-auto">
                    <h4 className="font-semibold text-gray-900">CONSENTIMIENTO INFORMADO PARA PROCEDIMIENTO QUIRÚRGICO</h4>
                    <p className="text-sm text-gray-700 mt-2">
                      Yo, <strong>{personalInfo.full_name}</strong>, declaro que:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>He sido informado(a) sobre la naturaleza de mi procedimiento quirúrgico</li>
                      <li>Comprendo los riesgos y beneficios del procedimiento</li>
                      <li>He tenido la oportunidad de hacer preguntas</li>
                      <li>Autorizo al equipo médico a realizar el procedimiento</li>
                      <li>La información proporcionada es veraz y completa</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-4">
                      Este documento cumple con la NOM-024-SSA3-2012 sobre sistemas de información de registro electrónico para la salud.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <SignaturePad
                onSave={handleSignatureSave}
                disabled={loading}
              />

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                  disabled={loading}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
