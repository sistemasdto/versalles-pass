// =====================================================
// LANDING PAGE - Versalles Pass
// =====================================================

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Clock, FileCheck, QrCode } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-navy-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Versalles Pass Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-navy-500 text-navy-500 hover:bg-navy-50">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            Pre-admisión Quirúrgica Digital
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-navy-500 mb-6">
            Su cirugía comienza con un
            <span className="text-navy-500"> clic</span>
          </h1>

          <p className="text-xl text-navy-300 mb-8 max-w-2xl mx-auto">
            Complete su pre-admisión quirúrgica desde casa de forma segura, rápida y sin papeleo.
            Todo listo en menos de 10 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Comenzar Pre-admisión
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona Versalles Pass?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" />}
              title="1. Complete sus datos"
              description="Ingrese su información personal y detalles de su cirugía"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="2. Suba documentos"
              description="Cargue INE y póliza de seguro de forma segura"
            />
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" />}
              title="3. Firme digitalmente"
              description="Firme el consentimiento informado con su dedo"
            />
            <FeatureCard
              icon={<QrCode className="w-8 h-8" />}
              title="4. Reciba su QR"
              description="Obtenga su código de ingreso rápido al hospital"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Clock className="w-12 h-12 text-navy-500" />}
              title="Ahorre Tiempo"
              description="Complete su pre-admisión en 10 minutos desde casa. Sin filas ni esperas."
            />
            <BenefitCard
              icon={<Shield className="w-12 h-12 text-navy-500" />}
              title="100% Seguro"
              description="Sus datos están protegidos con encriptación de nivel bancario y cumpliendo NOM-024-SSA3."
            />
            <BenefitCard
              icon={<QrCode className="w-12 h-12 text-navy-500" />}
              title="Ingreso Express"
              description="Presente su código QR y pase directo a preparación quirúrgica."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para su Pre-admisión Digital?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Complete su proceso ahora y llegue al hospital sin preocupaciones
          </p>
          <Link href="/login">
            <Button size="lg" className="gap-2 bg-white text-navy-500 hover:bg-gray-100">
              Comenzar Ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Hospital Versalles. Todos los derechos reservados.
            </p>
            <p className="text-sm text-gray-600">
              +50 años sirviendo a Guadalajara, Jalisco
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-navy-500 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-medical shadow-medical hover:shadow-medical-hover transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
