// =====================================================
// VALIDATIONS - Zod Schemas
// =====================================================

import { z } from 'zod'

// =====================================================
// PERSONAL INFO SCHEMA
// =====================================================
export const personalInfoSchema = z.object({
  full_name: z.string()
    .min(3, 'El nombre completo debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),

  date_of_birth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),

  phone: z.string()
    .regex(/^\d{10}$/, 'El teléfono debe tener 10 dígitos'),

  email: z.string()
    .email('Email inválido'),

  allergies: z.string().optional(),

  blood_type: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),

  address: z.string().optional(),

  city: z.string().default('Guadalajara'),

  state: z.string().default('Jalisco'),

  postal_code: z.string()
    .regex(/^\d{5}$/, 'Código postal inválido (5 dígitos)')
    .optional(),

  emergency_contact_name: z.string()
    .min(3, 'Nombre del contacto de emergencia requerido'),

  emergency_contact_phone: z.string()
    .regex(/^\d{10}$/, 'Teléfono de emergencia inválido'),

  emergency_contact_relationship: z.string()
    .min(2, 'Especifique la relación con el contacto'),
})

// =====================================================
// SURGERY INFO SCHEMA
// =====================================================
export const surgeryInfoSchema = z.object({
  surgery_type: z.string()
    .min(3, 'Especifique el tipo de cirugía'),

  surgeon_name: z.string()
    .min(3, 'Nombre del cirujano requerido'),

  scheduled_date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido'),

  scheduled_time: z.string()
    .regex(/^\d{2}:\d{2}$/, 'Formato de hora inválido (HH:MM)')
    .optional(),

  notes: z.string().optional(),
})

// =====================================================
// DOCUMENT UPLOAD SCHEMA
// =====================================================
export const documentUploadSchema = z.object({
  document_type: z.enum(['ine', 'insurance', 'medical_records', 'lab_results', 'other']),
  file_name: z.string(),
  file_size: z.number().max(5 * 1024 * 1024, 'El archivo no debe superar 5MB'),
  mime_type: z.string().refine(
    (type) => ['application/pdf', 'image/jpeg', 'image/png'].includes(type),
    'Solo se permiten archivos PDF, JPG o PNG'
  ),
})

// =====================================================
// SIGNATURE SCHEMA
// =====================================================
export const signatureSchema = z.object({
  signature_data: z.string()
    .min(100, 'Por favor, firme en el espacio designado')
    .startsWith('data:image/png;base64,', 'Formato de firma inválido'),
})

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export function validateFileSize(file: File): boolean {
  return file.size <= 5 * 1024 * 1024 // 5MB
}

export function validateFileType(file: File): boolean {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
  return allowedTypes.includes(file.type)
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
}
