// =====================================================
// DOCUMENT UPLOAD COMPONENT
// Carga de documentos con validación
// =====================================================

'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Upload, File, X, CheckCircle } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { cn } from '@/lib/utils'
import { validateFileSize, validateFileType, getDocumentTypeName } from '@/lib/utils'
import type { DocumentType } from '@/types'

interface DocumentUploadProps {
  documentType: DocumentType
  onUpload: (file: File, documentType: DocumentType) => Promise<void>
  existingFile?: string
}

export function DocumentUpload({ documentType, onUpload, existingFile }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError('')

    if (!selectedFile) return

    // Validaciones
    if (!validateFileSize(selectedFile)) {
      setError('El archivo no debe superar 5MB')
      return
    }

    if (!validateFileType(selectedFile)) {
      setError('Solo se permiten archivos PDF, JPG o PNG')
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError('')

    try {
      await onUpload(file, documentType)
    } catch (err) {
      setError('Error al subir el archivo. Intente nuevamente.')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isUploaded = existingFile || (file && !error)

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span>{getDocumentTypeName(documentType)}</span>
          {isUploaded && <CheckCircle className="w-5 h-5 text-green-500" />}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!file && !existingFile && (
          <label
            className={cn(
              'flex flex-col items-center justify-center w-full h-32',
              'border-2 border-dashed rounded-medical cursor-pointer',
              'bg-gray-50 hover:bg-gray-100 transition-colors',
              error ? 'border-red-300' : 'border-gray-300 hover:border-navy-500'
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={cn('w-8 h-8 mb-2', error ? 'text-red-500' : 'text-gray-400')} />
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Haga clic para subir</span> o arrastre
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG o PNG (máx. 5MB)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
        )}

        {file && !existingFile && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-medical">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="text-gray-400 hover:text-red-500 transition-colors"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={handleUpload}
              isLoading={uploading}
              disabled={uploading}
              className="w-full"
            >
              Subir Documento
            </Button>
          </div>
        )}

        {existingFile && (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-medical border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-900">Documento subido correctamente</p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </CardContent>
    </Card>
  )
}
