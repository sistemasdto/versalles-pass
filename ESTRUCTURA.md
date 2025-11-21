# 📁 ESTRUCTURA DEL PROYECTO - Versalles Pass

Documentación completa de la estructura de archivos y directorios.

---

## 🗂️ ÁRBOL DE DIRECTORIOS

```
versalles-pass/
│
├── 📄 Archivos de configuración raíz
│   ├── package.json                    # Dependencias y scripts npm
│   ├── package-lock.json               # Lockfile de dependencias
│   ├── tsconfig.json                   # Configuración de TypeScript
│   ├── next.config.js                  # Configuración de Next.js
│   ├── tailwind.config.ts              # Configuración de Tailwind CSS
│   ├── postcss.config.js               # Configuración de PostCSS
│   ├── .eslintrc.json                  # Reglas de ESLint
│   ├── .gitignore                      # Archivos ignorados por Git
│   ├── .env.local.example              # Ejemplo de variables de entorno
│   ├── .env.local                      # Variables de entorno (NO commitear)
│   ├── middleware.ts                   # Middleware de Next.js (auth)
│   ├── next-env.d.ts                   # Tipos de Next.js
│   └── vercel.json                     # Configuración de Vercel
│
├── 📚 Documentación
│   ├── README.md                       # Documentación principal
│   ├── SETUP.md                        # Guía de instalación rápida
│   ├── PRESENTACION.md                 # Guía para presentación ejecutiva
│   ├── RESUMEN.md                      # Resumen ejecutivo del proyecto
│   ├── CHANGELOG.md                    # Historial de versiones
│   ├── DEMO-SCRIPT.md                  # Script para demostración en vivo
│   ├── PRE-DEPLOY-CHECKLIST.md         # Checklist pre-despliegue
│   └── ESTRUCTURA.md                   # Este archivo
│
├── 🗄️ supabase/
│   └── schema.sql                      # Schema completo de PostgreSQL
│
├── 🌐 public/
│   ├── hospital-logo.svg               # (Placeholder para logo)
│   └── consentimiento-template.pdf     # (Placeholder para plantilla)
│
└── 💻 src/
    │
    ├── 📱 app/                         # App Router de Next.js
    │   │
    │   ├── layout.tsx                  # Layout raíz (metadata, fonts)
    │   ├── page.tsx                    # Landing page (/)
    │   ├── globals.css                 # Estilos globales
    │   │
    │   ├── login/
    │   │   └── page.tsx                # Página de login Magic Link
    │   │
    │   ├── pre-admission/
    │   │   └── page.tsx                # Wizard de pre-admisión (4 pasos)
    │   │
    │   ├── dashboard/
    │   │   └── page.tsx                # Dashboard del paciente con QR
    │   │
    │   └── api/
    │       ├── auth/callback/
    │       │   └── route.ts            # Callback de Supabase Auth
    │       │
    │       └── generate-pdf/
    │           └── route.ts            # API para generar PDF con firma
    │
    ├── 🧩 components/
    │   │
    │   ├── ui/                         # Componentes base reutilizables
    │   │   ├── Button.tsx              # Botón con variantes
    │   │   ├── Input.tsx               # Input con validación
    │   │   └── Card.tsx                # Card container
    │   │
    │   ├── SignaturePad.tsx            # Canvas para firma digital
    │   ├── WizardSteps.tsx             # Indicador de progreso del wizard
    │   ├── DocumentUpload.tsx          # Componente de carga de archivos
    │   └── QRDisplay.tsx               # Visualización del código QR
    │
    ├── 📚 lib/
    │   │
    │   ├── supabase/
    │   │   ├── client.ts               # Cliente de Supabase (browser)
    │   │   ├── server.ts               # Cliente de Supabase (server)
    │   │   └── middleware.ts           # Middleware para auth
    │   │
    │   ├── validations.ts              # Schemas de validación (Zod)
    │   ├── pdf-generator.ts            # Generación de PDFs con pdf-lib
    │   └── utils.ts                    # Funciones auxiliares
    │
    └── 📝 types/
        └── index.ts                    # Definiciones de tipos TypeScript

```

---

## 📄 DESCRIPCIÓN DETALLADA DE ARCHIVOS

### **📁 Raíz del Proyecto**

#### `package.json`
**Propósito:** Define dependencias y scripts del proyecto
**Dependencias clave:**
- `next`: Framework React con SSR
- `@supabase/supabase-js`: Cliente de Supabase
- `react-signature-canvas`: Firma digital
- `pdf-lib`: Generación de PDFs
- `react-qr-code`: Códigos QR
- `zod`: Validación de schemas
- `tailwindcss`: Framework CSS

**Scripts:**
- `npm run dev`: Desarrollo local
- `npm run build`: Build de producción
- `npm run start`: Servidor de producción
- `npm run lint`: Linting
- `npm run type-check`: Verificación de tipos

---

#### `tsconfig.json`
**Propósito:** Configuración de TypeScript
**Configuraciones clave:**
- Strict mode habilitado
- Path alias: `@/*` → `./src/*`
- JSX preserve para React
- Target ES2017

---

#### `next.config.js`
**Propósito:** Configuración de Next.js
**Configuraciones:**
- Permitir imágenes de Supabase Storage
- Límite de body para Server Actions: 5MB

---

#### `tailwind.config.ts`
**Propósito:** Personalización de Tailwind CSS
**Branding:**
- Color primario: `#43E660` (verde pastel)
- Color secundario: `#CCCCCC` (gris plata)
- Border radius médico: `12px`
- Sombras médicas suaves

---

#### `middleware.ts`
**Propósito:** Gestión de sesiones de Supabase
**Funcionalidad:**
- Intercepta todas las requests
- Refresca sesión de auth automáticamente
- Protege rutas autenticadas

---

### **📁 supabase/**

#### `schema.sql`
**Propósito:** Definición completa de la base de datos
**Contenido:**
- **Tablas:** patients, admissions, documents, audit_log
- **Row-Level Security (RLS):** Políticas de acceso estrictas
- **Índices:** Para performance
- **Triggers:** updated_at automático
- **Funciones:** generate_unique_qr()
- **Storage policies:** Para bucket private-docs

**Líneas de código:** ~450

---

### **📁 src/app/**

#### `layout.tsx`
**Propósito:** Layout raíz de la aplicación
**Contenido:**
- Metadata SEO
- Fuente Inter
- Estilos globales

---

#### `page.tsx` (Landing)
**Propósito:** Página de inicio/landing
**Secciones:**
- Hero con call-to-action
- Características (4 pasos)
- Beneficios (3 cards)
- CTA final
- Footer

---

#### `login/page.tsx`
**Propósito:** Autenticación passwordless
**Flujo:**
1. Usuario ingresa email
2. Sistema envía Magic Link
3. Muestra confirmación
4. Redirige a pre-admission al hacer clic

**Componentes:**
- Formulario de email
- Validación de formato
- Estados de loading y success

---

#### `pre-admission/page.tsx` ⭐ **PÁGINA PRINCIPAL**
**Propósito:** Formulario wizard completo de 4 pasos
**Líneas de código:** ~650

**Paso 1: Datos Personales**
- Nombre, fecha de nacimiento, teléfono, email
- Alergias, tipo de sangre
- Dirección
- Contacto de emergencia
- Validación con Zod

**Paso 2: Información Quirúrgica**
- Tipo de cirugía
- Nombre del cirujano
- Fecha y hora programada
- Notas adicionales

**Paso 3: Documentos**
- Upload de INE
- Upload de póliza de seguro
- Validación de tipo y tamaño
- Storage en bucket privado

**Paso 4: Firma Digital**
- Canvas de firma
- Texto del consentimiento
- Captura biométrica
- Generación de PDF
- Creación de QR

**Funcionalidades:**
- Precarga de datos existentes
- Navegación atrás/adelante
- Persistencia en cada paso
- Estados de loading
- Manejo de errores

---

#### `dashboard/page.tsx`
**Propósito:** Vista post-admisión con QR
**Contenido:**
- Bienvenida personalizada
- Código QR grande
- Detalles de la cirugía
- Descarga de PDF firmado
- Recordatorios importantes
- Información de contacto
- Botón de logout

---

#### `api/auth/callback/route.ts`
**Propósito:** Endpoint de callback de Supabase Auth
**Flujo:**
1. Recibe code de Magic Link
2. Intercambia code por sesión
3. Redirige a pre-admission

---

#### `api/generate-pdf/route.ts`
**Propósito:** API para generar PDF con firma
**Flujo:**
1. Recibe admission_id, patient_id, signature_data
2. Consulta datos de DB
3. Genera QR único
4. Crea PDF con pdf-lib
5. Sube PDF a Storage
6. Actualiza admission con URL y QR
7. Retorna resultado

**Seguridad:**
- Verifica autenticación
- Valida ownership de datos

---

### **📁 src/components/**

#### `ui/Button.tsx`
**Propósito:** Componente de botón reutilizable
**Variantes:**
- primary (verde)
- secondary (gris)
- outline (borde)
- ghost (transparente)
- danger (rojo)

**Tamaños:** sm, md, lg

**Estados:** loading, disabled

---

#### `ui/Input.tsx`
**Propósito:** Input con validación integrada
**Features:**
- Label opcional
- Mensaje de error
- Helper text
- Estados focus/disabled

---

#### `ui/Card.tsx`
**Propósito:** Container de contenido
**Subcomponentes:**
- Card (principal)
- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

---

#### `SignaturePad.tsx` ⭐ **COMPONENTE CRÍTICO**
**Propósito:** Captura de firma digital
**Tecnología:** react-signature-canvas
**Características:**
- Soporte mouse y touch
- Botón de limpiar
- Validación de firma no vacía
- Conversión a base64 PNG
- Responsive
- Línea guía visual

**Líneas de código:** ~150

---

#### `WizardSteps.tsx`
**Propósito:** Indicador visual de progreso
**Estados:** pending, current, completed
**Diseño:** Circles con números + líneas conectoras

---

#### `DocumentUpload.tsx`
**Propósito:** Carga de archivos
**Validaciones:**
- Tipo: PDF, JPG, PNG
- Tamaño: máx 5MB
- Nombres únicos

**Estados:** idle, uploading, uploaded, error

---

#### `QRDisplay.tsx`
**Propósito:** Visualización del QR final
**Librería:** react-qr-code
**Contenido:**
- QR code (200x200px)
- Datos del paciente
- Instrucciones de uso
- Botón de descarga de PDF

---

### **📁 src/lib/**

#### `supabase/client.ts`
**Propósito:** Cliente de Supabase para browser
**Uso:** Client Components

---

#### `supabase/server.ts`
**Propósito:** Cliente de Supabase para server
**Uso:** Server Components, Route Handlers

---

#### `supabase/middleware.ts`
**Propósito:** Helper para middleware de auth
**Funcionalidad:** Gestión de cookies de sesión

---

#### `validations.ts`
**Propósito:** Schemas de validación con Zod
**Schemas:**
- personalInfoSchema
- surgeryInfoSchema
- documentUploadSchema
- signatureSchema

**Helpers:**
- validateFileSize()
- validateFileType()
- sanitizeFileName()

---

#### `pdf-generator.ts` ⭐ **LÓGICA CLAVE**
**Propósito:** Generación de PDFs profesionales
**Librería:** pdf-lib
**Contenido del PDF:**
- Header con logo Hospital Versalles
- Título del documento
- Datos del paciente
- Información quirúrgica
- Código QR
- Declaraciones del consentimiento
- Firma digital incrustada
- Línea de firma
- Footer con cumplimiento NOM-024

**Líneas de código:** ~250

---

#### `utils.ts`
**Propósito:** Funciones auxiliares
**Funciones:**
- `cn()`: Combina clases de Tailwind
- `formatDate()`: Formato español de fechas
- `formatPhone()`: Formato mexicano de teléfonos
- `getDocumentTypeName()`: Nombres legibles de docs
- `generateUniqueFileName()`: Nombres únicos de archivos

---

### **📁 src/types/**

#### `index.ts`
**Propósito:** Definiciones de tipos TypeScript
**Tipos definidos:**
- BloodType
- AdmissionStatus
- DocumentType
- Patient (interface)
- Admission (interface)
- Document (interface)
- AuditLog (interface)
- PersonalInfoForm
- SurgeryInfoForm
- DocumentUpload
- WizardStep
- SignatureData
- ApiResponse

**Total de interfaces/types:** 15+

---

## 📊 ESTADÍSTICAS DEL PROYECTO

```
Total de archivos:        60+
Total de líneas de código: ~3,500
Componentes React:        12
Páginas:                  4
API Routes:               2
Tipos TypeScript:         15+
Schemas Zod:              4
SQL (líneas):             450+
Documentación (páginas):  8
```

---

## 🎨 CONVENCIONES DE CÓDIGO

### **Nombres de Archivos**
- Componentes: `PascalCase.tsx`
- Utilidades: `camelCase.ts`
- Rutas API: `route.ts` (Next.js convention)
- Páginas: `page.tsx` (Next.js convention)

### **Estructura de Componentes**
```typescript
// Imports
import { useState } from 'react'
import { Component } from './Component'

// Types/Interfaces
interface ComponentProps {
  // ...
}

// Component
export function MyComponent({ props }: ComponentProps) {
  // State
  const [state, setState] = useState()

  // Handlers
  const handleAction = () => {}

  // Render
  return <div>...</div>
}
```

### **Comentarios**
- Secciones de código: `// ====== TÍTULO ======`
- Funciones importantes: JSDoc comments
- Código en español cuando sea relevante

### **Estilos**
- Tailwind utility classes
- Classes ordenadas: layout → spacing → typography → colors → effects
- Usar `cn()` para combinar clases condicionales

---

## 🔄 FLUJO DE DATOS

```
Usuario ingresa datos
    ↓
Validación client-side (Zod)
    ↓
Submit a API/Database
    ↓
Validación server-side (RLS)
    ↓
Actualización de DB
    ↓
Revalidación de cache (Next.js)
    ↓
Actualización de UI
```

---

## 🚀 COMANDOS DE DESARROLLO

```bash
# Instalación
npm install

# Desarrollo
npm run dev                    # Servidor local :3000
npm run build                  # Build de producción
npm run start                  # Servidor de producción
npm run lint                   # ESLint
npm run type-check             # TypeScript check

# Testing (cuando se implemente)
npm test                       # Jest tests
npm run test:e2e               # Playwright E2E
```

---

## 📦 BUNDLE SIZE (estimado)

```
Page                           Size      First Load JS
┌ ○ /                         5.2 kB         95 kB
├ ○ /login                    3.8 kB         93 kB
├ ○ /pre-admission           12.4 kB        105 kB
├ ○ /dashboard                6.1 kB         96 kB
├ λ /api/auth/callback        0 kB          89 kB
└ λ /api/generate-pdf         2.3 kB         91 kB

○  (Static)  automatically rendered as static HTML
λ  (Server)  server-side renders at runtime
```

---

## 🔐 ARCHIVOS SENSIBLES (NO COMMITEAR)

```
.env.local                    # Credenciales locales
.env.production               # Credenciales de producción
node_modules/                 # Dependencias
.next/                        # Build de Next.js
*.log                         # Logs
.vercel/                      # Config de Vercel
```

---

## 📚 REFERENCIAS RÁPIDAS

| Necesitas... | Ver archivo... |
|-------------|---------------|
| Instalar el proyecto | `SETUP.md` |
| Entender la arquitectura | `README.md` |
| Presentar a ejecutivos | `PRESENTACION.md` |
| Hacer una demo | `DEMO-SCRIPT.md` |
| Desplegar a producción | `PRE-DEPLOY-CHECKLIST.md` |
| Ver historial de cambios | `CHANGELOG.md` |
| Resumen ejecutivo | `RESUMEN.md` |
| Modificar estilos | `tailwind.config.ts` |
| Agregar validaciones | `src/lib/validations.ts` |
| Cambiar el PDF | `src/lib/pdf-generator.ts` |
| Modificar la DB | `supabase/schema.sql` |

---

**Esta estructura está diseñada para ser:**
- ✅ **Escalable:** Fácil agregar nuevas features
- ✅ **Mantenible:** Separación clara de responsabilidades
- ✅ **Type-safe:** TypeScript en todo el codebase
- ✅ **Documentada:** Comentarios y docs completas

---

**Última actualización:** Enero 2025
**Mantenido por:** Equipo de Sistemas TI - Tecno Office
