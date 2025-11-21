// =====================================================
// PDF GENERATOR - Generación de PDF con firma
// =====================================================

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface PDFGenerationData {
  patientName: string
  surgeryType: string
  surgeonName: string
  scheduledDate: string
  signatureDataURL: string
  qrCode: string
}

export async function generateConsentPDF(data: PDFGenerationData): Promise<Uint8Array> {
  // Crear nuevo documento PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 792]) // Tamaño carta

  // Cargar fuentes
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const { width, height } = page.getSize()
  let yPosition = height - 50

  // Logo/Header
  page.drawText('HOSPITAL VERSALLES', {
    x: 50,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: rgb(0.26, 0.9, 0.38), // Verde Pastel #43E660
  })

  yPosition -= 15
  page.drawText('Guadalajara, Jalisco | +50 años de experiencia', {
    x: 50,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: rgb(0.4, 0.4, 0.4),
  })

  yPosition -= 40

  // Título
  page.drawText('CONSENTIMIENTO INFORMADO', {
    x: 50,
    y: yPosition,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20
  page.drawText('PROCEDIMIENTO QUIRÚRGICO', {
    x: 50,
    y: yPosition,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 30

  // Información del paciente
  const addField = (label: string, value: string) => {
    page.drawText(`${label}:`, {
      x: 50,
      y: yPosition,
      size: 11,
      font: boldFont,
      color: rgb(0, 0, 0),
    })
    page.drawText(value, {
      x: 200,
      y: yPosition,
      size: 11,
      font: regularFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= 20
  }

  addField('Paciente', data.patientName)
  addField('Procedimiento', data.surgeryType)
  addField('Cirujano', data.surgeonName)
  addField('Fecha programada', new Date(data.scheduledDate).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }))
  addField('Código QR', data.qrCode)

  yPosition -= 20

  // Declaración
  page.drawText('DECLARACIÓN DEL PACIENTE', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 25

  const declarations = [
    'Declaro que he sido informado(a) sobre la naturaleza de mi procedimiento quirúrgico.',
    'Comprendo los riesgos, beneficios y alternativas del procedimiento.',
    'He tenido la oportunidad de hacer preguntas y han sido respondidas satisfactoriamente.',
    'Autorizo al equipo médico del Hospital Versalles a realizar el procedimiento.',
    'La información proporcionada en este documento es veraz y completa.',
    'Consiento el uso de anestesia necesaria para el procedimiento.',
  ]

  declarations.forEach((text, index) => {
    page.drawText(`${index + 1}.`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: regularFont,
      color: rgb(0, 0, 0),
    })

    const lines = wrapText(text, 90)
    lines.forEach((line) => {
      page.drawText(line, {
        x: 65,
        y: yPosition,
        size: 10,
        font: regularFont,
        color: rgb(0, 0, 0),
      })
      yPosition -= 15
    })
    yPosition -= 5
  })

  yPosition -= 20

  // Firma
  page.drawText('FIRMA DEL PACIENTE:', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 100

  try {
    // Incrustar la firma (base64 a imagen)
    const signatureImage = await pdfDoc.embedPng(data.signatureDataURL)
    const signatureDims = signatureImage.scale(0.3)

    page.drawImage(signatureImage, {
      x: 50,
      y: yPosition,
      width: signatureDims.width,
      height: signatureDims.height,
    })
  } catch (error) {
    console.error('Error al incrustar firma:', error)
  }

  yPosition -= 30

  // Línea de firma
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 250, y: yPosition },
    thickness: 1,
    color: rgb(0, 0, 0),
  })

  yPosition -= 15

  page.drawText(data.patientName, {
    x: 50,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 15

  page.drawText(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, {
    x: 50,
    y: yPosition,
    size: 10,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  })

  // Footer con normativa
  page.drawText(
    'Este documento cumple con la NOM-024-SSA3-2012 sobre sistemas de información de registro electrónico para la salud.',
    {
      x: 50,
      y: 50,
      size: 8,
      font: regularFont,
      color: rgb(0.5, 0.5, 0.5),
      maxWidth: width - 100,
    }
  )

  page.drawText(`Generado digitalmente por Versalles Pass | Hospital Versalles`, {
    x: 50,
    y: 35,
    size: 8,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  })

  // Serializar el PDF
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

// Helper para dividir texto largo
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  words.forEach((word) => {
    if ((currentLine + word).length <= maxChars) {
      currentLine += word + ' '
    } else {
      lines.push(currentLine.trim())
      currentLine = word + ' '
    }
  })

  if (currentLine) {
    lines.push(currentLine.trim())
  }

  return lines
}
