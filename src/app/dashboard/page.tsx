// =====================================================
// DASHBOARD PAGE - Demo Mode con Mock Storage
// =====================================================

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth, mockDB } from '@/lib/mock-storage'
import { QRDisplay } from '@/components/QRDisplay'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LogOut, FileText, User, Calendar, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface DashboardData {
  patient: {
    full_name: string
    email: string
    phone: string
  }
  admission: {
    id: string
    surgery_type: string
    surgeon_name: string
    scheduled_date: string
    scheduled_time: string
    qr_code: string
    consent_pdf_url: string
    status: string
  }
}

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        // Verificar autenticación
        const user = mockAuth.getCurrentUser()

        if (!user) {
          router.push('/login')
          return
        }

        // Obtener datos del paciente
        const patient = await mockDB.patients.getByUserId(user.id)

        if (!patient) {
          router.push('/pre-admission')
          return
        }

        // Obtener última admisión
        const admission = await mockDB.admissions.getByPatientId(patient.id)

        if (!admission) {
          router.push('/pre-admission')
          return
        }

        setData({
          patient: {
            full_name: patient.full_name,
            email: patient.email,
            phone: patient.phone,
          },
          admission: {
            id: admission.id,
            surgery_type: admission.surgery_type,
            surgeon_name: admission.surgeon_name,
            scheduled_date: admission.scheduled_date,
            scheduled_time: admission.scheduled_time || '',
            qr_code: admission.qr_code || '',
            consent_pdf_url: admission.consent_pdf_url || '',
            status: admission.status,
          },
        })
      } catch (error) {
        console.error('Error al cargar datos:', error)
        alert('Error al cargar su información')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  const handleLogout = () => {
    mockAuth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No se encontraron datos</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Versalles Pass</h1>
                <p className="text-xs text-gray-600">Dashboard del Paciente</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Bienvenida */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary-500" />
                Bienvenido(a), {data.patient.full_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Su proceso de pre-admisión ha sido completado exitosamente.
                A continuación encontrará su código QR de ingreso y toda la información necesaria.
              </p>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <QRDisplay
            qrCode={data.admission.qr_code}
            patientName={data.patient.full_name}
            surgeryDate={formatDate(data.admission.scheduled_date)}
            pdfUrl={data.admission.consent_pdf_url}
          />

          {/* Información de la Cirugía */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                Detalles de su Cirugía
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Procedimiento</p>
                  <p className="font-semibold text-gray-900">{data.admission.surgery_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cirujano</p>
                  <p className="font-semibold text-gray-900">{data.admission.surgeon_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(data.admission.scheduled_date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hora</p>
                  <p className="font-semibold text-gray-900">
                    {data.admission.scheduled_time || 'Por confirmar'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recordatorios */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Recordatorios Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Llegue 30 minutos antes de su hora programada</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Traiga una identificación oficial vigente</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Presente su código QR en el mostrador de admisión</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Siga las instrucciones de ayuno que le indique su médico</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Asista acompañado de un adulto responsable</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Información de contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-500" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Hospital Versalles</p>
                  <p className="text-gray-900">Guadalajara, Jalisco</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono de Contacto</p>
                  <p className="text-gray-900 font-medium">(33) 3000-0000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Correo Electrónico</p>
                  <p className="text-gray-900">{data.patient.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado */}
          <div className="text-center py-4">
            <p className="text-sm text-gray-600">
              Estado de pre-admisión:{' '}
              <span className="font-semibold text-green-600 uppercase">
                {data.admission.status === 'signed' ? 'Completada' : data.admission.status}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Modo Demo - Datos almacenados localmente
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
