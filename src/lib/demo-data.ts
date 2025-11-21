// =====================================================
// DEMO DATA - Hospital Versalles
// =====================================================

import type { Doctor, ScheduledSurgery, Room, SurgeryCategory } from '@/types'

// =====================================================
// DOCTORES DEL HOSPITAL
// =====================================================

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    full_name: 'Dra. Claudia Jazmín Ochoa Chávez',
    specialty: 'Pediatría',
    professional_license: '4856321',
    phone: '33-3615-8520',
    email: 'dra.ochoa@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-2',
    full_name: 'Dr. Ramiro Chávez Montoya',
    specialty: 'Otorrinolaringología',
    professional_license: '3274985',
    phone: '33-3615-8521',
    email: 'dr.chavez@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-3',
    full_name: 'Dr. Tulio Héctor Moreno Vargas',
    specialty: 'Ginecología',
    professional_license: '2198763',
    phone: '33-3615-8522',
    email: 'dr.moreno@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-4',
    full_name: 'Dra. María Teresa Rodríguez Pérez',
    specialty: 'Cirugía Plástica',
    professional_license: '5432187',
    phone: '33-3615-8523',
    email: 'dra.rodriguez@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-5',
    full_name: 'Dr. Marco Antonio González Palacios',
    specialty: 'Pediatría',
    professional_license: '6789543',
    phone: '33-3615-8524',
    email: 'dr.gonzalez@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-6',
    full_name: 'Dra. Karla Yanet Barba de la Torre',
    specialty: 'Ginecología',
    professional_license: '1928374',
    phone: '33-3615-8525',
    email: 'dra.barba@hospitalversalles.com',
    available: true,
  },
  {
    id: 'doc-7',
    full_name: 'Dra. María Enriqueta Ambríz Plascencia',
    specialty: 'Ortopedia y Traumatología',
    professional_license: '8765432',
    phone: '33-3615-8526',
    email: 'dra.ambriz@hospitalversalles.com',
    available: true,
  },
]

// =====================================================
// HABITACIONES DISPONIBLES
// =====================================================

export const ROOMS: Room[] = [
  {
    id: 'room-1',
    room_number: '201',
    floor: 2,
    room_type: 'private',
    amenities: [
      'Servicio de enfermería 24 horas',
      'Dieta para el paciente según indicación médica',
      'Aseo de la habitación',
      'Internet inalámbrico',
      'Cambio de ropa diario',
      'Televisión por cable',
      'Caja fuerte',
    ],
    available: true,
  },
  {
    id: 'room-2',
    room_number: '305',
    floor: 3,
    room_type: 'suite',
    amenities: [
      'Servicio de enfermería 24 horas',
      'Dieta para el paciente según indicación médica',
      'Aseo de la habitación',
      'Internet inalámbrico',
      'Cambio de ropa diario',
      'Televisión por cable',
      'Caja fuerte',
      'Sofá cama para acompañante',
      'Minibar',
    ],
    available: true,
  },
  {
    id: 'room-3',
    room_number: '412',
    floor: 4,
    room_type: 'standard',
    amenities: [
      'Servicio de enfermería 24 horas',
      'Dieta para el paciente según indicación médica',
      'Aseo de la habitación',
      'Internet inalámbrico',
      'Cambio de ropa diario',
      'Televisión por cable',
    ],
    available: true,
  },
]

// =====================================================
// TIPOS DE CIRUGÍA DISPONIBLES
// =====================================================

export const SURGERY_TYPES = [
  // Ginecología y Maternidad
  { value: 'cesarea', label: 'Cesárea', category: 'maternal' as SurgeryCategory },
  { value: 'histerectomia', label: 'Histerectomía', category: 'maternal' as SurgeryCategory },
  { value: 'laparoscopia_ginecologica', label: 'Laparoscopía Ginecológica', category: 'maternal' as SurgeryCategory },
  { value: 'miomectomia', label: 'Miomectomía', category: 'maternal' as SurgeryCategory },

  // Pediatría
  { value: 'apendicectomia_pediatrica', label: 'Apendicectomía Pediátrica', category: 'pediatric' as SurgeryCategory },
  { value: 'herniorrafia_pediatrica', label: 'Herniorrafia Pediátrica', category: 'pediatric' as SurgeryCategory },
  { value: 'circuncision', label: 'Circuncisión', category: 'pediatric' as SurgeryCategory },

  // Ortopedia
  { value: 'artroscopia_rodilla', label: 'Artroscopía de Rodilla', category: 'orthopedic' as SurgeryCategory },
  { value: 'reemplazo_cadera', label: 'Reemplazo de Cadera', category: 'orthopedic' as SurgeryCategory },
  { value: 'fractura_femur', label: 'Reparación de Fractura de Fémur', category: 'orthopedic' as SurgeryCategory },

  // Cirugía Plástica
  { value: 'rinoplastia', label: 'Rinoplastia', category: 'plastic' as SurgeryCategory },
  { value: 'mamoplastia', label: 'Mamoplastia', category: 'plastic' as SurgeryCategory },
  { value: 'liposuccion', label: 'Liposucción', category: 'plastic' as SurgeryCategory },

  // Otorrinolaringología
  { value: 'amigdalectomia', label: 'Amigdalectomía', category: 'ent' as SurgeryCategory },
  { value: 'septoplastia', label: 'Septoplastia', category: 'ent' as SurgeryCategory },
  { value: 'timpanoplastia', label: 'Timpanoplastia', category: 'ent' as SurgeryCategory },

  // Cirugía General
  { value: 'colecistectomia', label: 'Colecistectomía Laparoscópica', category: 'general' as SurgeryCategory },
  { value: 'hernia_inguinal', label: 'Reparación de Hernia Inguinal', category: 'general' as SurgeryCategory },
  { value: 'apendicectomia', label: 'Apendicectomía', category: 'general' as SurgeryCategory },
]

// =====================================================
// CIRUGÍAS PROGRAMADAS (PRE-CARGADAS)
// =====================================================

export const SCHEDULED_SURGERIES: ScheduledSurgery[] = [
  {
    id: 'sched-1',
    surgery_name: 'Cesárea Programada',
    surgery_type: 'cesarea',
    category: 'maternal',
    doctor_id: 'doc-6',
    doctor_name: 'Dra. Karla Yanet Barba de la Torre',
    doctor_specialty: 'Ginecología',
    professional_license: '1928374',
    scheduled_date: '2025-12-05',
    scheduled_time: '08:00',
    estimated_duration_hours: 1.5,
    room_id: 'room-2',
    room_number: '305',
    estimated_stay_days: 3,
    pre_loaded: true,
  },
  {
    id: 'sched-2',
    surgery_name: 'Artroscopía de Rodilla',
    surgery_type: 'artroscopia_rodilla',
    category: 'orthopedic',
    doctor_id: 'doc-7',
    doctor_name: 'Dra. María Enriqueta Ambríz Plascencia',
    doctor_specialty: 'Ortopedia y Traumatología',
    professional_license: '8765432',
    scheduled_date: '2025-12-10',
    scheduled_time: '10:00',
    estimated_duration_hours: 2,
    room_id: 'room-1',
    room_number: '201',
    estimated_stay_days: 2,
    pre_loaded: true,
  },
]

// =====================================================
// ASEGURADORAS ACEPTADAS
// =====================================================

export const INSURANCE_PROVIDERS = [
  'Sin seguro (pago directo)',
  'IMSS',
  'ISSSTE',
  'Seguros Monterrey',
  'GNP Seguros',
  'Metlife',
  'AXA Seguros',
  'Banorte Generali',
  'Allianz',
  'Mapfre',
  'Inbursa',
  'Otro',
]

// =====================================================
// RECOMENDACIONES GENERALES
// =====================================================

export const GENERAL_RECOMMENDATIONS = [
  'Un cambio de ropa y zapatos cómodos',
  'Artículos de aseo personal (cepillo de dientes, pasta dental, cepillo para cabello, etc.)',
  'El hospital proporciona una bata, sin embargo puede traer uno o dos camisones si lo prefiere',
  'Dejar objetos de valor en casa, o en su defecto en la caja fuerte de su habitación',
]

export const MATERNITY_RECOMMENDATIONS = [
  ...GENERAL_RECOMMENDATIONS,
  'Para el bebé: 1 mameluco, calcetines, gorro',
  'Sábana y 2 cobijas para el bebé',
  'Porta-bebé o moisés para transportar al bebé con seguridad',
  'Ropa cómoda para amamantar',
]

// =====================================================
// HORARIOS DE VISITA
// =====================================================

export const VISIT_HOURS = {
  general: {
    weekday: '10:00 - 13:00 y 16:00 - 20:00',
    weekend: '10:00 - 20:00',
    max_visitors: 2,
  },
  maternity: {
    weekday: '10:00 - 13:00 y 16:00 - 21:00',
    weekend: '10:00 - 21:00',
    max_visitors: 2,
    note: 'Padre del bebé puede permanecer 24 horas',
  },
}

// =====================================================
// INFORMACIÓN DE EGRESO
// =====================================================

export const DISCHARGE_INFO = {
  room_checkout: '12:00 horas',
  general: [
    'La autorización de alta es extendida por el médico tratante',
    'Su enfermera le entregará las recomendaciones médicas al egreso',
    'Recibirá los medicamentos que no fueron aplicados durante su estancia',
    'Salida en silla de ruedas por seguridad',
    'Al pagar su cuenta recibirá el "Pase de salida"',
  ],
  maternity: [
    'Alta de la paciente extendida por el médico tratante',
    'Alta del recién nacido extendida por el pediatra',
    'El "Pase de salida" se mostrará en el área de cunero',
    'Entrega formal del bebé junto con constancia de nacimiento',
    'Su enfermera le entregará las recomendaciones médicas',
  ],
}

// =====================================================
// FAQ - PREGUNTAS FRECUENTES
// =====================================================

export const FAQ_ITEMS = [
  {
    question: '¿Puedo cambiar la fecha de mi cirugía?',
    answer: 'Sí, puede solicitar un cambio de fecha contactando directamente a su médico tratante o llamando al hospital al (33) 3615-8520. Se recomienda hacerlo con al menos 48 horas de anticipación.',
  },
  {
    question: '¿Qué documentos debo presentar el día de mi cirugía?',
    answer: 'Debe presentar: identificación oficial vigente, póliza de seguro (si aplica), su código QR de pre-admisión, y cualquier estudio o análisis clínico solicitado por su médico.',
  },
  {
    question: '¿Cuánto tiempo antes debo llegar?',
    answer: 'Recomendamos llegar 30 minutos antes de su hora programada para completar los trámites de admisión y preparación.',
  },
  {
    question: '¿Puedo tener acompañante durante mi estancia?',
    answer: 'Sí, en habitaciones privadas y suites puede tener un acompañante. En el caso de maternidad, el padre del bebé puede permanecer 24 horas.',
  },
  {
    question: '¿Qué pasa si no tengo seguro médico?',
    answer: 'Puede realizar el pago directo. Solicite una cotización detallada en el área de admisión o llame al hospital.',
  },
  {
    question: '¿Puedo visitar a mi familiar en el hospital?',
    answer: 'Sí, el horario de visita general es de 10:00 a 13:00 y de 16:00 a 20:00. Máximo 2 visitantes por paciente.',
  },
]
