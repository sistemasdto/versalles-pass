// =====================================================
// LOGIN PAGE - Demo Mode (Sin Magic Link)
// =====================================================

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { mockAuth } from '@/lib/mock-storage'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Mail, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validar email básico
      if (!email.includes('@')) {
        throw new Error('Email inválido')
      }

      // Simular autenticación
      await mockAuth.signInWithEmail(email)

      // Redirigir directo a pre-admission
      router.push('/pre-admission')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Versalles Pass Logo"
              width={220}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-500 rounded-full mb-4 hidden">
            <span className="text-white font-bold text-2xl">V</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Versalles Pass</h1>
          <p className="text-gray-600">Pre-admisión Quirúrgica Digital</p>
        </div>

        {/* Card de Login */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Acceso Demo</CardTitle>
            <CardDescription className="text-base">
              Ingrese su correo electrónico para acceder al sistema de pre-admisión
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                label="Correo Electrónico"
                placeholder="su.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                error={error}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full gap-2"
                isLoading={loading}
                disabled={loading}
              >
                <Mail className="w-5 h-5" />
                Ingresar al Sistema
              </Button>
            </form>

            {/* Aviso de Modo Demo */}
            <div className="mt-6 p-4 bg-blue-50 rounded-medical border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Modo Demostración
                  </p>
                  <p className="text-xs text-blue-700">
                    Esta es una versión demo con datos simulados. Ingrese cualquier email válido para probar el sistema. Los datos se guardan temporalmente en su navegador.
                  </p>
                </div>
              </div>
            </div>

            {/* Sugerencias de Email */}
            <div className="mt-4 p-3 bg-gray-50 rounded-medical">
              <p className="text-xs font-medium text-gray-700 mb-2">Ejemplos de email para probar:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setEmail('maria.sanchez@demo.com')}
                  className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-navy-500 transition-colors"
                >
                  maria.sanchez@demo.com
                </button>
                <button
                  type="button"
                  onClick={() => setEmail('juan.perez@demo.com')}
                  className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-navy-500 transition-colors"
                >
                  juan.perez@demo.com
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link de regreso */}
        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>

        {/* Footer de seguridad */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Demo powered by Vercel | Hospital Versalles
          </p>
        </div>
      </div>
    </div>
  )
}
