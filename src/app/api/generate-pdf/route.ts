// =====================================================
// PDF GENERATION API ROUTE
// =====================================================

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generateConsentPDF } from '@/lib/pdf-generator'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Verificar autenticación
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { admission_id, patient_id, signature_data } = body

    // Obtener datos del paciente y admisión
    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('id', patient_id)
      .single()

    const { data: admission } = await supabase
      .from('admissions')
      .select('*')
      .eq('id', admission_id)
      .single()

    if (!patient || !admission) {
      return NextResponse.json({ error: 'Datos no encontrados' }, { status: 404 })
    }

    // Generar QR Code único
    const { data: qrData } = await supabase.rpc('generate_unique_qr')
    const qrCode = qrData || `VERSALLES-${Date.now()}`

    // Generar PDF
    const pdfBytes = await generateConsentPDF({
      patientName: patient.full_name,
      surgeryType: admission.surgery_type,
      surgeonName: admission.surgeon_name,
      scheduledDate: admission.scheduled_date,
      signatureDataURL: signature_data,
      qrCode: qrCode,
    })

    // Subir PDF a Supabase Storage
    const fileName = `consent_${admission_id}_${Date.now()}.pdf`
    const filePath = `${user.id}/${admission_id}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('private-docs')
      .upload(filePath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (uploadError) {
      console.error('Error al subir PDF:', uploadError)
      throw uploadError
    }

    // Obtener URL pública del PDF
    const {
      data: { publicUrl },
    } = supabase.storage.from('private-docs').getPublicUrl(filePath)

    // Actualizar admission con el PDF y QR
    const { error: updateError } = await supabase
      .from('admissions')
      .update({
        consent_pdf_url: publicUrl,
        qr_code: qrCode,
        status: 'approved',
      })
      .eq('id', admission_id)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      pdf_url: publicUrl,
      qr_code: qrCode,
    })
  } catch (error: any) {
    console.error('Error en generación de PDF:', error)
    return NextResponse.json(
      { error: 'Error al generar PDF: ' + error.message },
      { status: 500 }
    )
  }
}
