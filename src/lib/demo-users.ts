// =====================================================
// DEMO USERS - Pre-loaded Data
// =====================================================

import type { Patient, Admission } from '@/types'

export const DEMO_USERS = {
  cesar: {
    email: 'cesaromardominguez-a@hotmail.com',
    patient: {
      id: 'patient-cesar',
      user_id: 'user-cesar',
      full_name: 'César Omar Domínguez Aguirre',
      date_of_birth: '1985-03-15',
      phone: '3312458796',
      email: 'cesaromardominguez-a@hotmail.com',
      allergies: ['ninguna'],
      blood_type: 'O+' as const,
      address: 'Av. Circunvalación Agustín Yáñez 2377',
      city: 'Guadalajara',
      state: 'Jalisco',
      postal_code: '44160',
      emergency_contact_name: 'Laura Patricia Aguirre López',
      emergency_contact_phone: '3398765432',
      emergency_contact_relationship: 'Esposa',
      insurance_provider: 'GNP Seguros',
      insurance_policy_number: 'GNP-2024-785432',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Patient,
    admission: {
      id: 'admission-cesar',
      patient_id: 'patient-cesar',
      scheduled_surgery_id: 'sched-2',
      surgery_type: 'artroscopia_rodilla',
      surgery_category: 'orthopedic' as const,
      surgeon_name: 'Dra. María Enriqueta Ambríz Plascencia',
      surgeon_id: 'doc-7',
      professional_license: '8765432',
      scheduled_date: '2025-12-10',
      scheduled_time: '10:00',
      estimated_duration_hours: 2,
      room_id: 'room-1',
      room_number: '201',
      estimated_stay_days: 2,
      status: 'pending' as const,
      consent_signed: false,
      notes: 'Paciente con lesión en menisco lateral. Requiere artroscopía.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Admission,
  },
  arely: {
    email: 'arely.arriaga@gmail.com',
    patient: {
      id: 'patient-arely',
      user_id: 'user-arely',
      full_name: 'Arely Guadalupe Arriaga Hernández',
      date_of_birth: '1992-08-22',
      phone: '3323456789',
      email: 'arely.arriaga@gmail.com',
      allergies: ['penicilina'],
      blood_type: 'A+' as const,
      address: 'Calle Independencia 1523',
      city: 'Guadalajara',
      state: 'Jalisco',
      postal_code: '44100',
      emergency_contact_name: 'Roberto Arriaga Morales',
      emergency_contact_phone: '3387654321',
      emergency_contact_relationship: 'Esposo',
      insurance_provider: 'Seguros Monterrey',
      insurance_policy_number: 'SMT-2024-456789',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Patient,
    admission: {
      id: 'admission-arely',
      patient_id: 'patient-arely',
      scheduled_surgery_id: 'sched-1',
      surgery_type: 'cesarea',
      surgery_category: 'maternal' as const,
      surgeon_name: 'Dra. Karla Yanet Barba de la Torre',
      surgeon_id: 'doc-6',
      professional_license: '1928374',
      scheduled_date: '2025-12-05',
      scheduled_time: '08:00',
      estimated_duration_hours: 1.5,
      room_id: 'room-2',
      room_number: '305',
      estimated_stay_days: 3,
      status: 'pending' as const,
      consent_signed: false,
      maternity_info: {
        is_maternity: true,
        due_date: '2025-12-05',
        pediatrician_id: 'doc-5',
        pediatrician_name: 'Dr. Marco Antonio González Palacios',
        baby_recommendations: [
          'Traer para el bebé: 1 mameluco, calcetines, gorro',
          'Sábana y 2 cobijas para el bebé',
          'Porta-bebé o moisés para transportar al bebé',
          'Ropa cómoda para amamantar',
        ],
      },
      notes: 'Cesárea programada. Embarazo de 38 semanas. Segunda cesárea.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Admission,
  },
}

// Función helper para obtener usuario demo por email
export function getDemoUserByEmail(email: string) {
  if (email === DEMO_USERS.cesar.email) {
    return DEMO_USERS.cesar
  }
  if (email === DEMO_USERS.arely.email) {
    return DEMO_USERS.arely
  }
  return null
}
