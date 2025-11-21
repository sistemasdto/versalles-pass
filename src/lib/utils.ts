// =====================================================
// UTILITY FUNCTIONS
// =====================================================

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind CSS de manera segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea fecha a formato legible en español
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Formatea teléfono a formato mexicano (33) 1234-5678
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/**
 * Obtiene el nombre legible del tipo de documento
 */
export function getDocumentTypeName(type: string): string {
  const types: Record<string, string> = {
    ine: 'Identificación Oficial (INE)',
    insurance: 'Póliza de Seguro',
    medical_records: 'Historial Médico',
    lab_results: 'Resultados de Laboratorio',
    other: 'Otro Documento',
  }
  return types[type] || type
}

/**
 * Genera un nombre de archivo único
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
  return `${nameWithoutExt}_${timestamp}_${random}.${extension}`
}

/**
 * Valida el tamaño del archivo (máx 5MB)
 */
export function validateFileSize(file: File): boolean {
  const maxSize = 5 * 1024 * 1024 // 5MB
  return file.size <= maxSize
}

/**
 * Valida el tipo de archivo (PDF, JPEG, PNG)
 */
export function validateFileType(file: File): boolean {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
  return allowedTypes.includes(file.type)
}
