// =====================================================
// MOCK STORAGE - Sistema de datos simulados para demo
// Utiliza localStorage para persistencia temporal
// =====================================================

import type { Patient, Admission, Document } from '@/types'

const STORAGE_KEYS = {
  PATIENTS: 'versalles_pass_patients',
  ADMISSIONS: 'versalles_pass_admissions',
  DOCUMENTS: 'versalles_pass_documents',
  CURRENT_USER: 'versalles_pass_current_user',
  SESSION: 'versalles_pass_session',
}

// =====================================================
// MOCK AUTH
// =====================================================

export const mockAuth = {
  signInWithEmail: async (email: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Guardar "sesión"
    const session = {
      user: {
        id: generateUserId(email),
        email,
      },
      expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
    }

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, email)

    return { success: true }
  },

  getSession: () => {
    const sessionStr = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (!sessionStr) return null

    const session = JSON.parse(sessionStr)

    // Verificar si expiró
    if (session.expires_at < Date.now()) {
      mockAuth.signOut()
      return null
    }

    return session
  },

  getCurrentUser: () => {
    const session = mockAuth.getSession()
    return session?.user || null
  },

  signOut: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  },
}

// =====================================================
// MOCK DATABASE
// =====================================================

export const mockDB = {
  // PATIENTS
  patients: {
    async getByUserId(userId: string): Promise<Patient | null> {
      const patients = getAllPatients()
      return patients.find(p => p.user_id === userId) || null
    },

    async upsert(data: Partial<Patient>): Promise<Patient> {
      const patients = getAllPatients()
      const existingIndex = patients.findIndex(p => p.id === data.id || p.user_id === data.user_id)

      const patient: Patient = {
        id: data.id || generateId(),
        user_id: data.user_id!,
        full_name: data.full_name!,
        date_of_birth: data.date_of_birth!,
        phone: data.phone!,
        email: data.email!,
        allergies: data.allergies,
        blood_type: data.blood_type,
        address: data.address,
        city: data.city || 'Guadalajara',
        state: data.state || 'Jalisco',
        postal_code: data.postal_code,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        emergency_contact_relationship: data.emergency_contact_relationship,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      if (existingIndex >= 0) {
        patients[existingIndex] = patient
      } else {
        patients.push(patient)
      }

      savePatients(patients)
      return patient
    },
  },

  // ADMISSIONS
  admissions: {
    async create(data: Partial<Admission>): Promise<Admission> {
      const admissions = getAllAdmissions()

      const admission: Admission = {
        id: generateId(),
        patient_id: data.patient_id!,
        surgery_type: data.surgery_type!,
        surgeon_name: data.surgeon_name!,
        scheduled_date: data.scheduled_date!,
        scheduled_time: data.scheduled_time,
        status: data.status || 'pending',
        consent_signed: data.consent_signed || false,
        consent_signed_at: data.consent_signed_at,
        signature_data: data.signature_data,
        consent_pdf_url: data.consent_pdf_url,
        qr_code: data.qr_code,
        notes: data.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      admissions.push(admission)
      saveAdmissions(admissions)
      return admission
    },

    async update(id: string, data: Partial<Admission>): Promise<Admission> {
      const admissions = getAllAdmissions()
      const index = admissions.findIndex(a => a.id === id)

      if (index < 0) throw new Error('Admission not found')

      admissions[index] = {
        ...admissions[index],
        ...data,
        updated_at: new Date().toISOString(),
      }

      saveAdmissions(admissions)
      return admissions[index]
    },

    async getByPatientId(patientId: string): Promise<Admission | null> {
      const admissions = getAllAdmissions()
      const patientAdmissions = admissions.filter(a => a.patient_id === patientId)

      // Retornar la más reciente
      if (patientAdmissions.length === 0) return null
      return patientAdmissions.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0]
    },
  },

  // DOCUMENTS
  documents: {
    async create(data: Partial<Document>): Promise<Document> {
      const documents = getAllDocuments()

      const document: Document = {
        id: generateId(),
        admission_id: data.admission_id!,
        patient_id: data.patient_id!,
        document_type: data.document_type!,
        file_name: data.file_name!,
        file_path: data.file_path!,
        file_size: data.file_size,
        mime_type: data.mime_type,
        verified: false,
        uploaded_at: new Date().toISOString(),
      }

      documents.push(document)
      saveDocuments(documents)
      return document
    },

    async getByAdmissionId(admissionId: string): Promise<Document[]> {
      const documents = getAllDocuments()
      return documents.filter(d => d.admission_id === admissionId)
    },
  },
}

// =====================================================
// MOCK STORAGE (para documentos)
// =====================================================

export const mockStorage = {
  async upload(path: string, file: File): Promise<{ success: boolean; path: string }> {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // En una demo real, aquí podrías usar FileReader para convertir a base64
    // y guardarlo en localStorage, pero para simplificar solo guardamos metadata

    return {
      success: true,
      path: `mock://storage/${path}`,
    }
  },

  getPublicUrl(path: string): string {
    return `https://demo.versallespass.com/storage/${path}`
  },
}

// =====================================================
// HELPERS
// =====================================================

function getAllPatients(): Patient[] {
  const data = localStorage.getItem(STORAGE_KEYS.PATIENTS)
  return data ? JSON.parse(data) : []
}

function savePatients(patients: Patient[]) {
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients))
}

function getAllAdmissions(): Admission[] {
  const data = localStorage.getItem(STORAGE_KEYS.ADMISSIONS)
  return data ? JSON.parse(data) : []
}

function saveAdmissions(admissions: Admission[]) {
  localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(admissions))
}

function getAllDocuments(): Document[] {
  const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS)
  return data ? JSON.parse(data) : []
}

function saveDocuments(documents: Document[]) {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents))
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function generateUserId(email: string): string {
  // Generar ID consistente basado en email
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i)
    hash = hash & hash
  }
  return `user-${Math.abs(hash)}`
}

// Generar QR único
export function generateUniqueQR(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `VERSALLES-${timestamp}-${random}`
}

// Limpiar datos (útil para testing)
export function clearMockData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}
