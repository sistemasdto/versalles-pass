// =====================================================
// QR DISPLAY COMPONENT
// Muestra el código QR de ingreso
// =====================================================

'use client'

import QRCode from 'react-qr-code'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Download, CheckCircle } from 'lucide-react'
import { Button } from './ui/Button'

interface QRDisplayProps {
  qrCode: string
  patientName: string
  surgeryDate: string
  pdfUrl?: string
}

export function QRDisplay({ qrCode, patientName, surgeryDate, pdfUrl }: QRDisplayProps) {
  const handleDownloadPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank')
    }
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-green-600">
          Pre-admisión Completada
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Su proceso de pre-admisión ha sido completado exitosamente
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Información del paciente */}
        <div className="bg-gray-50 rounded-medical p-4 text-left">
          <h4 className="font-semibold text-gray-900 mb-2">Detalles del Ingreso</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-gray-600">Paciente:</span> <span className="font-medium">{patientName}</span></p>
            <p><span className="text-gray-600">Fecha programada:</span> <span className="font-medium">{surgeryDate}</span></p>
            <p><span className="text-gray-600">Código:</span> <span className="font-mono font-medium">{qrCode}</span></p>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white p-6 rounded-medical border-2 border-primary-500 inline-block mx-auto">
          <QRCode
            value={qrCode}
            size={200}
            level="H"
          />
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 rounded-medical p-4 text-left border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Instrucciones de Ingreso</h4>
          <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
            <li>Presente este código QR en el mostrador de admisión</li>
            <li>Llegue 30 minutos antes de su hora programada</li>
            <li>Traiga una identificación oficial vigente</li>
            <li>El personal verificará su información al escanear el código</li>
          </ol>
        </div>

        {/* Botón de descarga */}
        {pdfUrl && (
          <Button
            onClick={handleDownloadPDF}
            variant="primary"
            size="lg"
            className="w-full gap-2"
          >
            <Download className="w-5 h-5" />
            Descargar Consentimiento Firmado (PDF)
          </Button>
        )}

        {/* Nota importante */}
        <p className="text-xs text-gray-500 mt-4">
          Guarde este código o tome una captura de pantalla.
          También hemos enviado una copia a su correo electrónico.
        </p>
      </CardContent>
    </Card>
  )
}
