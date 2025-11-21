// =====================================================
// SIGNATURE PAD COMPONENT
// Captura de firma digital biométrica
// =====================================================

'use client'

import { useRef, useState, useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from './ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Pen, RotateCcw, Check } from 'lucide-react'

interface SignaturePadProps {
  onSave: (signatureData: string) => void
  onClear?: () => void
  disabled?: boolean
}

export function SignaturePad({ onSave, onClear, disabled = false }: SignaturePadProps) {
  const signatureRef = useRef<SignatureCanvas>(null)
  const [isEmpty, setIsEmpty] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Ajustar el tamaño del canvas al contenedor
    const handleResize = () => {
      const canvas = signatureRef.current?.getCanvas()
      if (canvas) {
        const container = canvas.parentElement
        if (container) {
          canvas.width = container.offsetWidth
          canvas.height = container.offsetHeight
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBegin = () => {
    setIsEmpty(false)
  }

  const handleClear = () => {
    signatureRef.current?.clear()
    setIsEmpty(true)
    onClear?.()
  }

  const handleSave = async () => {
    if (signatureRef.current && !isEmpty) {
      setIsSaving(true)
      try {
        // Obtener la imagen en base64
        const signatureData = signatureRef.current.toDataURL('image/png')

        // Validar que no esté vacía
        if (signatureData && signatureData.length > 100) {
          onSave(signatureData)
        } else {
          alert('Por favor, firme en el espacio designado')
        }
      } catch (error) {
        console.error('Error al guardar la firma:', error)
        alert('Error al procesar la firma. Intente nuevamente.')
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pen className="w-5 h-5 text-primary-500" />
          Firma Digital
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Por favor, firme en el recuadro utilizando su dedo (dispositivo táctil) o el mouse.
          Esta firma será utilizada para el consentimiento informado.
        </p>
      </CardHeader>

      <CardContent>
        <div className="relative border-2 border-dashed border-gray-300 rounded-medical bg-gray-50 overflow-hidden">
          {/* Canvas de firma */}
          <div className="relative w-full h-64 md:h-80">
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                className: 'w-full h-full cursor-crosshair',
                style: { touchAction: 'none' },
              }}
              penColor="rgb(0, 0, 0)"
              minWidth={1}
              maxWidth={3}
              onBegin={handleBegin}
              backgroundColor="rgba(255, 255, 255, 1)"
            />

            {/* Línea guía para firma */}
            <div className="absolute bottom-12 left-8 right-8 border-b-2 border-gray-300 pointer-events-none" />

            {/* Indicador de "Firme aquí" */}
            {isEmpty && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Pen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg font-medium">Firme aquí</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Use su dedo o mouse
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones adicionales */}
        <div className="mt-4 p-3 bg-blue-50 rounded-medical border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> Su firma digital tiene la misma validez legal que una firma manuscrita.
            Al firmar, usted acepta los términos del consentimiento informado para su procedimiento quirúrgico.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={isEmpty || disabled || isSaving}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Limpiar
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={handleSave}
          disabled={isEmpty || disabled || isSaving}
          isLoading={isSaving}
          className="gap-2"
        >
          <Check className="w-4 h-4" />
          Confirmar Firma
        </Button>
      </CardFooter>
    </Card>
  )
}
