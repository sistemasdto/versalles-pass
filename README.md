# 🏥 Versalles Pass

**Sistema de Pre-admisión Quirúrgica Digital para Hospital Versalles**

Sistema completo de pre-admisión quirúrgica que elimina el papeleo físico, acelera el proceso de ingreso y garantiza la seguridad de los datos médicos mediante firma digital y código QR.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth+DB-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-cyan?style=flat-square&logo=tailwindcss)

---

## 🎯 **Características Principales**

- ✅ **Autenticación sin contraseña (Magic Link)** vía correo electrónico
- 📝 **Formulario wizard multi-paso** con validación en tiempo real
- 🖊️ **Firma digital biométrica** capturada con canvas HTML5
- 📄 **Generación automática de PDF** con firma incrustada
- 🔐 **Row-Level Security (RLS)** en Supabase para privacidad total
- 📱 **Código QR único** para ingreso rápido al hospital
- 🎨 **Diseño médico limpio** con branding Hospital Versalles
- ☁️ **100% Cloud** - Listo para Vercel + Supabase (tier gratuito)

---

## 🏗️ **Arquitectura del Sistema**

```
┌─────────────────┐
│   Paciente      │  → Accede desde cualquier dispositivo
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────┐
│   Next.js 14 (App Router)       │
│   - SSR + Client Components     │
│   - API Routes para PDF         │
│   - Middleware Auth             │
└────────┬────────────────────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌───────┐  ┌──────────────────┐
│ Vercel│  │  Supabase        │
│ Edge  │  │  - PostgreSQL    │
│ Funcs │  │  - Auth (Magic)  │
└───────┘  │  - Storage       │
           │  - RLS Policies  │
           └──────────────────┘
```

---

## 🚀 **Inicio Rápido**

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/versalles-pass.git
cd versalles-pass
```

### **2. Instalar Dependencias**

```bash
npm install
```

### **3. Configurar Variables de Entorno**

Copia el archivo de ejemplo y completa con tus credenciales de Supabase:

```bash
cp .env.local.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Obtener credenciales:**
1. Ve a [app.supabase.com](https://app.supabase.com)
2. Crea un proyecto nuevo (o usa uno existente)
3. Ve a **Settings → API**
4. Copia `Project URL` y `anon/public key`

### **4. Configurar la Base de Datos**

Ejecuta el script SQL en tu proyecto de Supabase:

1. Abre **SQL Editor** en Supabase Dashboard
2. Copia todo el contenido de `supabase/schema.sql`
3. Ejecuta el script
4. Verifica que las tablas se crearon correctamente

### **5. Configurar Supabase Storage**

En el Dashboard de Supabase:

1. Ve a **Storage**
2. Crea un bucket llamado `private-docs`
3. Configuración:
   - **Public:** ❌ NO (privado)
   - **File size limit:** 5MB
   - **Allowed MIME types:** `application/pdf`, `image/jpeg`, `image/png`

### **6. Configurar Autenticación**

En **Authentication → Settings**:

1. Habilita **Email Provider**
2. Configura **Site URL:** `http://localhost:3000`
3. Agrega **Redirect URLs:**
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000/pre-admission`

### **7. Ejecutar en Desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 **Despliegue en Producción**

### **Opción 1: Vercel (Recomendado)**

1. **Conecta tu repositorio a Vercel:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Configura las variables de entorno en Vercel:**
   - Ve a **Settings → Environment Variables**
   - Agrega:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_APP_URL` (tu dominio de Vercel)

3. **Actualiza las URLs en Supabase:**
   - **Site URL:** `https://tu-app.vercel.app`
   - **Redirect URLs:**
     - `https://tu-app.vercel.app/api/auth/callback`
     - `https://tu-app.vercel.app/pre-admission`

4. **Despliega:**
   ```bash
   vercel --prod
   ```

### **Opción 2: GitHub + Vercel (Automatizado)**

1. Sube tu código a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Configura las variables de entorno
4. Vercel detectará Next.js automáticamente
5. Cada push a `main` desplegará automáticamente

---

## 📋 **Stack Tecnológico**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.2+ | Framework React con App Router |
| **TypeScript** | 5.4+ | Type safety en todo el código |
| **Tailwind CSS** | 3.4+ | Estilos utility-first |
| **Supabase** | Latest | Backend-as-a-Service (DB, Auth, Storage) |
| **react-signature-canvas** | 1.0.6 | Captura de firma digital |
| **pdf-lib** | 1.17.1 | Generación de PDFs |
| **react-qr-code** | 2.0.12 | Generación de códigos QR |
| **zod** | 3.23+ | Validación de schemas |
| **lucide-react** | Latest | Iconografía |

---

## 🗂️ **Estructura del Proyecto**

```
versalles-pass/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx            # Landing page
│   │   ├── login/              # Autenticación Magic Link
│   │   ├── pre-admission/      # Wizard de pre-admisión
│   │   ├── dashboard/          # Dashboard del paciente
│   │   └── api/
│   │       ├── auth/callback/  # Callback de Supabase Auth
│   │       └── generate-pdf/   # API para generar PDFs
│   ├── components/
│   │   ├── ui/                 # Componentes base (Button, Input, Card)
│   │   ├── SignaturePad.tsx    # Captura de firma
│   │   ├── WizardSteps.tsx     # Indicador de pasos
│   │   ├── DocumentUpload.tsx  # Carga de documentos
│   │   └── QRDisplay.tsx       # Visualización de QR
│   ├── lib/
│   │   ├── supabase/           # Clientes de Supabase
│   │   ├── validations.ts      # Schemas Zod
│   │   ├── pdf-generator.ts    # Lógica de PDFs
│   │   └── utils.ts            # Utilidades generales
│   └── types/
│       └── index.ts            # Definiciones TypeScript
├── supabase/
│   └── schema.sql              # Schema de base de datos
├── public/                     # Assets estáticos
├── .env.local.example          # Ejemplo de variables
└── README.md                   # Esta documentación
```

---

## 🔐 **Seguridad y Privacidad**

### **Row-Level Security (RLS)**

Todos los datos están protegidos con políticas RLS:

- ✅ Los pacientes **solo ven sus propios datos**
- ✅ Usuarios autenticados no pueden acceder a datos de otros
- ✅ Cumplimiento con **NOM-024-SSA3-2012** (registros electrónicos de salud)

### **Protección de Documentos**

- Bucket `private-docs` configurado como **privado**
- Solo el propietario puede acceder a sus archivos
- URLs firmadas con expiración para descargas

### **Firma Digital**

- Captura biométrica del trazo en canvas
- Almacenada en base64 (PNG)
- Incrustada en PDF de forma inalterable
- Validez legal según legislación mexicana

---

## 🧪 **Testing Manual**

### **Flujo Completo de Pre-admisión:**

1. **Login:**
   - Ve a `/login`
   - Ingresa un email válido
   - Revisa tu bandeja y haz clic en el enlace

2. **Paso 1 - Datos Personales:**
   - Completa todos los campos requeridos
   - Valida que los errores aparezcan correctamente

3. **Paso 2 - Información Quirúrgica:**
   - Ingresa tipo de cirugía y cirujano
   - Selecciona fecha y hora

4. **Paso 3 - Documentos:**
   - Sube INE (imagen o PDF)
   - Sube póliza de seguro
   - Verifica que aparezcan como subidos

5. **Paso 4 - Firma:**
   - Firma en el canvas
   - Confirma la firma
   - Espera la generación del PDF

6. **Dashboard:**
   - Verifica que aparezca el QR
   - Descarga el PDF firmado
   - Revisa que contenga tu firma

---

## 🎨 **Branding y Diseño**

### **Paleta de Colores:**

```css
/* Verde Pastel - Hospital Versalles */
--primary: #43E660;

/* Gris Plata */
--silver: #CCCCCC;

/* Fondo Clínico */
--medical-bg: #FFFFFF;
```

### **Tipografía:**

- **Font:** Inter (Sans Serif)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### **Espaciado:**

- Border radius médico: `12px`
- Sombras suaves para elevación
- Mucho espacio en blanco (clean medical)

---

## 📊 **Base de Datos**

### **Tablas Principales:**

1. **patients** - Información personal del paciente
2. **admissions** - Registros de pre-admisiones quirúrgicas
3. **documents** - Documentos cargados (INE, seguro, etc.)
4. **audit_log** - Registro de auditoría para compliance

### **Diagrama de Relaciones:**

```
auth.users (Supabase Auth)
    ↓
patients (1:1 con user)
    ↓
admissions (1:N)
    ↓
documents (N:1)
```

---

## 🔧 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 3000)

# Producción
npm run build        # Compila el proyecto
npm start            # Ejecuta la versión compilada

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

---

## 🐛 **Troubleshooting**

### **Error: "No se puede conectar a Supabase"**

- Verifica que las variables de entorno estén correctamente configuradas
- Revisa que el proyecto de Supabase esté activo
- Comprueba que las URLs no tengan espacios o caracteres extra

### **Error: "Failed to upload document"**

- Confirma que el bucket `private-docs` existe
- Verifica las políticas de Storage en Supabase
- Revisa que el tamaño del archivo sea menor a 5MB

### **Error: "Magic Link no llega"**

- Revisa la carpeta de spam/correo no deseado
- Verifica que el Email Provider esté habilitado en Supabase
- Comprueba que las Redirect URLs estén configuradas

### **Error al generar PDF:**

- Verifica que `pdf-lib` esté instalado correctamente
- Confirma que la firma esté en formato base64 PNG
- Revisa los logs del servidor con `npm run dev`

---

## 📈 **Roadmap Futuro (Post-MVP)**

- [ ] **Panel de administración** para staff del hospital
- [ ] **Notificaciones SMS** para recordatorios
- [ ] **Integración con calendario** (Google Calendar, iCal)
- [ ] **Verificación de identidad** con OCR de INE
- [ ] **Multi-idioma** (Inglés, Español)
- [ ] **App móvil nativa** (React Native)
- [ ] **Integración con sistemas HIS** existentes

---

## 🤝 **Contribuciones**

Este es un proyecto privado para Hospital Versalles. Si deseas reportar un bug o sugerir una mejora, contacta al equipo de TI.

---

## 📄 **Licencia**

© 2025 Hospital Versalles. Todos los derechos reservados.

Proyecto desarrollado exclusivamente para Hospital Versalles, Guadalajara, Jalisco.

---

## 👨‍💻 **Soporte Técnico**

- **Email:** sistemas@hospitalversalles.com
- **Teléfono:** (33) 3000-0000 ext. 123
- **Horario:** Lunes a Viernes, 9:00 AM - 6:00 PM

---

## 🎉 **Para la Presentación**

### **Puntos Clave a Destacar:**

1. **Seguridad desde el Diseño:**
   - Row-Level Security (RLS) blindaje a nivel de fila en BD
   - Cumplimiento con NOM-024-SSA3-2012
   - Datos encriptados en tránsito y en reposo

2. **Eficiencia Operativa:**
   - De 20 minutos de papeleo a **30 segundos con QR**
   - Reducción de errores de captura manual
   - Sin colas en mostrador de admisión

3. **Escalabilidad Económica:**
   - Costo inicial: **$0** (tiers gratuitos de Vercel + Supabase)
   - Escala automáticamente según demanda
   - Sin servidores físicos ni licencias complejas

4. **Experiencia del Paciente:**
   - Proceso digital desde casa
   - Sin contraseñas que recordar
   - Diseño intuitivo y tranquilizador

---

**¡Versalles Pass está listo para transformar la experiencia quirúrgica en Hospital Versalles!** 🏥✨
