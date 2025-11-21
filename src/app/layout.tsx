// =====================================================
// ROOT LAYOUT - Versalles Pass
// =====================================================

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Versalles Pass | Pre-admisión Quirúrgica Digital',
  description: 'Sistema de pre-admisión quirúrgica digital para Hospital Versalles',
  keywords: ['hospital', 'pre-admisión', 'cirugía', 'Versalles', 'Guadalajara'],
  authors: [{ name: 'Hospital Versalles' }],
  themeColor: '#43E660',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
