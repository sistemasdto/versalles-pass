-- =====================================================
-- VERSALLES PASS - DATABASE SCHEMA
-- Sistema de Pre-admisión Quirúrgica Digital
-- Hospital Versalles, Guadalajara, Jalisco
-- =====================================================

-- EXTENSIONES NECESARIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABLA: patients
-- Información personal del paciente
-- =====================================================
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Datos personales
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  allergies TEXT,
  blood_type TEXT CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),

  -- Dirección
  address TEXT,
  city TEXT DEFAULT 'Guadalajara',
  state TEXT DEFAULT 'Jalisco',
  postal_code TEXT,

  -- Contacto de emergencia
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,

  -- Metadatos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Índices para búsqueda
  CONSTRAINT unique_user_id UNIQUE(user_id)
);

-- =====================================================
-- TABLA: admissions
-- Registro de pre-admisiones quirúrgicas
-- =====================================================
CREATE TABLE IF NOT EXISTS admissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,

  -- Información quirúrgica
  surgery_type TEXT NOT NULL,
  surgeon_name TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,

  -- Estado del proceso
  status TEXT DEFAULT 'pending' CHECK (
    status IN ('pending', 'documents_uploaded', 'signed', 'approved', 'completed', 'cancelled')
  ),

  -- Consentimiento
  consent_signed BOOLEAN DEFAULT FALSE,
  consent_signed_at TIMESTAMP WITH TIME ZONE,
  signature_data TEXT, -- Base64 de la firma

  -- PDF generado
  consent_pdf_url TEXT,

  -- QR Code para ingreso
  qr_code TEXT UNIQUE,

  -- Notas adicionales
  notes TEXT,

  -- Metadatos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: documents
-- Documentos cargados por el paciente (INE, Seguro, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admission_id UUID REFERENCES admissions(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE NOT NULL,

  -- Tipo de documento
  document_type TEXT NOT NULL CHECK (
    document_type IN ('ine', 'insurance', 'medical_records', 'lab_results', 'other')
  ),

  -- Almacenamiento
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Ruta en Supabase Storage
  file_size INTEGER, -- En bytes
  mime_type TEXT,

  -- Verificación
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,

  -- Metadatos
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Índice para búsqueda rápida
  CONSTRAINT unique_document UNIQUE(admission_id, document_type, file_name)
);

-- =====================================================
-- TABLA: audit_log
-- Registro de auditoría para compliance (NOM-024-SSA3-2012)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Referencia
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  admission_id UUID REFERENCES admissions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Acción
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'view', 'sign', 'download'
  table_name TEXT NOT NULL,
  record_id UUID,

  -- Detalles
  old_data JSONB,
  new_data JSONB,

  -- Metadata de seguridad
  ip_address INET,
  user_agent TEXT,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_admissions_patient_id ON admissions(patient_id);
CREATE INDEX idx_admissions_status ON admissions(status);
CREATE INDEX idx_admissions_scheduled_date ON admissions(scheduled_date);
CREATE INDEX idx_admissions_qr_code ON admissions(qr_code);
CREATE INDEX idx_documents_admission_id ON documents(admission_id);
CREATE INDEX idx_documents_patient_id ON documents(patient_id);
CREATE INDEX idx_audit_log_patient_id ON audit_log(patient_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at DESC);

-- =====================================================
-- TRIGGER: Updated_at automático
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admissions_updated_at
  BEFORE UPDATE ON admissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - CRÍTICO PARA PRIVACIDAD
-- =====================================================

-- Activar RLS en todas las tablas
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS PARA PATIENTS
-- Los usuarios solo pueden ver y editar sus propios datos
CREATE POLICY "Users can view their own patient data"
  ON patients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own patient data"
  ON patients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patient data"
  ON patients FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- POLÍTICAS PARA ADMISSIONS
CREATE POLICY "Users can view their own admissions"
  ON admissions FOR SELECT
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own admissions"
  ON admissions FOR INSERT
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own admissions"
  ON admissions FOR UPDATE
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- POLÍTICAS PARA DOCUMENTS
CREATE POLICY "Users can view their own documents"
  ON documents FOR SELECT
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own documents"
  ON documents FOR INSERT
  WITH CHECK (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own documents"
  ON documents FOR UPDATE
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own documents"
  ON documents FOR DELETE
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- POLÍTICAS PARA AUDIT_LOG (solo lectura para el usuario)
CREATE POLICY "Users can view their own audit logs"
  ON audit_log FOR SELECT
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE user_id = auth.uid()
    )
  );

-- =====================================================
-- STORAGE BUCKETS CONFIGURATION
-- Ejecutar estos comandos en la consola de Supabase Storage
-- =====================================================

/*
1. Crear bucket "private-docs" en Supabase Dashboard:
   - Nombre: private-docs
   - Public: NO (privado)
   - File Size Limit: 5MB
   - Allowed MIME types: application/pdf, image/jpeg, image/png

2. Configurar políticas de Storage:
*/

-- NOTA: Estas políticas se crean desde el Dashboard de Supabase Storage
-- o mediante SQL directo en storage.policies

-- Política para subir documentos
INSERT INTO storage.buckets (id, name, public)
VALUES ('private-docs', 'private-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Los usuarios pueden subir a su propia carpeta: {user_id}/*
CREATE POLICY "Users can upload to their own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'private-docs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Los usuarios pueden ver sus propios documentos
CREATE POLICY "Users can view their own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'private-docs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Los usuarios pueden eliminar sus propios documentos
CREATE POLICY "Users can delete their own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'private-docs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- FUNCIONES AUXILIARES
-- =====================================================

-- Función para generar QR único
CREATE OR REPLACE FUNCTION generate_unique_qr()
RETURNS TEXT AS $$
DECLARE
  qr_code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    qr_code := 'VERSALLES-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 12));
    SELECT EXISTS(SELECT 1 FROM admissions WHERE admissions.qr_code = qr_code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN qr_code;
END;
$$ LANGUAGE plpgsql;

-- Función para registrar auditoría automáticamente
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    patient_id,
    admission_id,
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  ) VALUES (
    COALESCE(NEW.patient_id, OLD.patient_id),
    COALESCE(NEW.id, OLD.id),
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar trigger de auditoría
CREATE TRIGGER audit_admissions
  AFTER INSERT OR UPDATE OR DELETE ON admissions
  FOR EACH ROW EXECUTE FUNCTION log_audit();

-- =====================================================
-- DATOS DE PRUEBA (OPCIONAL - Solo para desarrollo)
-- =====================================================
-- Comentar/eliminar en producción

-- INSERT INTO patients (user_id, full_name, date_of_birth, phone, email, blood_type)
-- VALUES (
--   'sample-uuid-here',
--   'Juan Pérez García',
--   '1985-03-15',
--   '3312345678',
--   'juan.perez@example.com',
--   'O+'
-- );

-- =====================================================
-- FIN DEL SCHEMA
-- =====================================================
