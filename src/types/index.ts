// =====================================================
// VERSALLES PASS - TypeScript Types
// =====================================================

export type BloodType =
  | 'A+' | 'A-' | 'A1+' | 'A2+'
  | 'B+' | 'B-'
  | 'AB+' | 'AB-'
  | 'O+' | 'O-'

export type CommonAllergy =
  | 'penicilina'
  | 'aspirina'
  | 'latex'
  | 'yodo'
  | 'anestesia'
  | 'sulfa'
  | 'ninguna'
  | 'otros'

export type Specialty =
  | 'Pediatría'
  | 'Ginecología'
  | 'Otorrinolaringología'
  | 'Cirugía Plástica'
  | 'Ortopedia y Traumatología'
  | 'Cirugía General'
  | 'Anestesiología'
  | 'Cardiología'

export type SurgeryCategory =
  | 'general'
  | 'maternal'
  | 'pediatric'
  | 'orthopedic'
  | 'plastic'
  | 'ent'

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
// NEW ENHANCED TYPES
// =====================================================

export interface Doctor {
  id: string
  full_name: string
  specialty: Specialty
  professional_license: string
  phone?: string
  email?: string
  available: boolean
}

export interface ScheduledSurgery {
  id: string
  surgery_name: string
  surgery_type: string
  category: SurgeryCategory
  doctor_id: string
  doctor_name: string
  doctor_specialty: Specialty
  professional_license: string
  scheduled_date: string
  scheduled_time: string
  estimated_duration_hours: number
  room_id: string
  room_number: string
  estimated_stay_days: number
  pre_loaded: boolean
}

export interface Room {
  id: string
  room_number: string
  floor: number
  room_type: 'standard' | 'private' | 'suite'
  amenities: string[]
  available: boolean
}

export interface MaternityInfo {
  is_maternity: boolean
  due_date?: string
  pediatrician_id?: string
  pediatrician_name?: string
  baby_recommendations?: string[]
}

export interface SurgeryTracking {
  surgery_id: string
  current_status: 'scheduled' | 'confirmed' | 'pre_op' | 'in_progress' | 'recovery' | 'completed'
  status_description: string
  last_updated: string
  video_url?: string
  instructions_pre: string[]
  instructions_during: string[]
  instructions_post: string[]
  discharge_info?: DischargeInfo
}

export interface DischargeInfo {
  discharge_time: string
  medications: string[]
  follow_up_date?: string
  special_instructions: string[]
}

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
  allergies?: CommonAllergy[]
  allergies_other?: string
  blood_type?: BloodType
  address?: string
  city: string
  state: string
  postal_code?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
  insurance_provider?: string
  insurance_policy_number?: string
  created_at: string
  updated_at: string
}

export interface Admission {
  id: string
  patient_id: string
  scheduled_surgery_id?: string
  surgery_type: string
  surgery_category: SurgeryCategory
  surgeon_name: string
  surgeon_id?: string
  professional_license?: string
  scheduled_date: string
  scheduled_time?: string
  estimated_duration_hours?: number
  room_id?: string
  room_number?: string
  estimated_stay_days?: number
  status: AdmissionStatus
  consent_signed: boolean
  consent_signed_at?: string
  signature_data?: string
  consent_pdf_url?: string
  qr_code?: string
  maternity_info?: MaternityInfo
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
  allergies: CommonAllergy[]
  allergies_other: string
  blood_type: BloodType | ''
  address: string
  city: string
  state: string
  postal_code: string
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string
  insurance_provider: string
  insurance_policy_number: string
}

export interface SurgeryInfoForm {
  use_scheduled: boolean
  scheduled_surgery_id: string
  surgery_type: string
  surgeon_id: string
  surgeon_name: string
  professional_license: string
  scheduled_date: string
  scheduled_time: string
  estimated_duration_hours: number
  room_number: string
  estimated_stay_days: number
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
