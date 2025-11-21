// =====================================================
// VERSALLES PASS - TypeScript Types
// =====================================================

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export type AdmissionStatus =
  | 'pending'
  | 'documents_uploaded'
  | 'signed'
  | 'approved'
  | 'completed'
  | 'cancelled'

export type DocumentType =
  | 'ine'
  | 'insurance'
  | 'medical_records'
  | 'lab_results'
  | 'other'

// =====================================================
// DATABASE TYPES
// =====================================================

export interface Patient {
  id: string
  user_id: string
  full_name: string
  date_of_birth: string
  phone: string
  email: string
  allergies?: string
  blood_type?: BloodType
  address?: string
  city: string
  state: string
  postal_code?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
  created_at: string
  updated_at: string
}

export interface Admission {
  id: string
  patient_id: string
  surgery_type: string
  surgeon_name: string
  scheduled_date: string
  scheduled_time?: string
  status: AdmissionStatus
  consent_signed: boolean
  consent_signed_at?: string
  signature_data?: string
  consent_pdf_url?: string
  qr_code?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  admission_id: string
  patient_id: string
  document_type: DocumentType
  file_name: string
  file_path: string
  file_size?: number
  mime_type?: string
  verified: boolean
  verified_by?: string
  verified_at?: string
  uploaded_at: string
}

export interface AuditLog {
  id: string
  patient_id?: string
  admission_id?: string
  user_id?: string
  action: string
  table_name: string
  record_id?: string
  old_data?: Record<string, any>
  new_data?: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}

// =====================================================
// FORM TYPES
// =====================================================

export interface PersonalInfoForm {
  full_name: string
  date_of_birth: string
  phone: string
  email: string
  allergies: string
  blood_type: BloodType | ''
  address: string
  city: string
  state: string
  postal_code: string
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string
}

export interface SurgeryInfoForm {
  surgery_type: string
  surgeon_name: string
  scheduled_date: string
  scheduled_time: string
  notes: string
}

export interface DocumentUpload {
  document_type: DocumentType
  file: File
}

// =====================================================
// UI TYPES
// =====================================================

export interface WizardStep {
  id: number
  title: string
  description: string
  icon: string
  status: 'pending' | 'current' | 'completed'
}

export interface SignatureData {
  isEmpty: boolean
  dataURL: string
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PDFGenerationResponse {
  success: boolean
  pdf_url: string
  qr_code: string
}
