# 🏥 Versalles Pass - MODO DEMO

**Sistema de Pre-admisión Quirúrgica Digital**
Hospital Versalles | Guadalajara, Jalisco

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-blue?style=flat-square&logo=typescript)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)

---

## ⚡ INICIO RÁPIDO (5 MINUTOS)

Esta es una **versión DEMO** que funciona 100% en Vercel sin necesidad de base de datos externa.

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
```

**¡ESO ES TODO!** No necesitas configurar Supabase, variables de entorno ni servicios externos.

---

## 🚀 DESPLIEGUE A VERCEL (1 MINUTO)

### Opción 1: Desde la Terminal

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Desplegar
vercel

# Seguir las instrucciones en pantalla
# ¡Listo en producción!
```

### Opción 2: Desde GitHub + Vercel Dashboard

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Clic en "Import Project"
4. Selecciona tu repositorio
5. Clic en "Deploy"

**No necesitas configurar variables de entorno.**

---

## 🎯 ¿CÓMO FUNCIONA EL MODO DEMO?

- ✅ **100% Client-Side**: Todo funciona en el navegador
- ✅ **localStorage**: Los datos se guardan localmente
- ✅ **Sin Backend**: No requiere base de datos externa
- ✅ **Sin Configuración**: Deploy directo a Vercel
- ✅ **Perfecto para Presentaciones**: Muestra todo el flujo

### Lo que SÍ funciona:

- ✅ Login (con cualquier email)
- ✅ Formulario wizard completo (4 pasos)
- ✅ Validación de datos con Zod
- ✅ Firma digital con canvas
- ✅ Upload de documentos (simulado)
- ✅ Generación de QR único
- ✅ Dashboard con todos los datos
- ✅ Navegación completa

### Lo que NO funciona (pero no importa para demo):

- ❌ Magic Link real por email
- ❌ Persistencia entre dispositivos
- ❌ Generación real de PDF
- ❌ Storage real de documentos

**Para la demo, todo luce y funciona igual.**

---

## 📱 FLUJO DE LA DEMO

### 1. **Login** (`/login`)
- Ingresa cualquier email válido (ej: `maria.sanchez@demo.com`)
- Clic en "Ingresar al Sistema"
- Redirige automáticamente a pre-admisión

### 2. **Wizard de Pre-admisión** (`/pre-admission`)

**Paso 1: Datos Personales**
- Nombre completo
- Fecha de nacimiento
- Teléfono, email
- Alergias, tipo de sangre
- Dirección
- Contacto de emergencia

**Paso 2: Información Quirúrgica**
- Tipo de cirugía
- Nombre del cirujano
- Fecha y hora programada

**Paso 3: Documentos**
- Upload de INE (cualquier imagen/PDF)
- Upload de Seguro (cualquier imagen/PDF)

**Paso 4: Firma Digital**
- Firma con mouse o touch
- Genera QR único automáticamente

### 3. **Dashboard** (`/dashboard`)
- Muestra código QR
- Detalles de la cirugía
- Recordatorios importantes
- Opción de "descargar PDF" (link demo)

---

## 🛠️ TECNOLOGÍAS

| Tech | Versión | Propósito |
|------|---------|-----------|
| **Next.js** | 14+ | Framework React SSR |
| **TypeScript** | 5.4+ | Type safety |
| **Tailwind CSS** | 3.4+ | Estilos |
| **Zod** | 3.23+ | Validación |
| **react-signature-canvas** | 1.0.6 | Firma digital |
| **react-qr-code** | 2.0.12 | Códigos QR |
| **localStorage** | Browser API | Persistencia |

---

## 📂 ESTRUCTURA SIMPLE

```
versalles-pass/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── login/page.tsx        # Login demo
│   │   ├── pre-admission/page.tsx # Wizard
│   │   └── dashboard/page.tsx    # Dashboard con QR
│   ├── components/
│   │   ├── ui/                   # Componentes base
│   │   ├── SignaturePad.tsx      # Firma digital
│   │   ├── DocumentUpload.tsx    # Upload docs
│   │   └── QRDisplay.tsx         # Código QR
│   └── lib/
│       ├── mock-storage.ts       # Sistema de datos simulados
│       ├── validations.ts        # Schemas Zod
│       └── utils.ts              # Utilidades
├── package.json
└── README-DEMO.md                # Este archivo
```

---

## 🎨 BRANDING

**Colores:**
- Verde Pastel: `#43E660`
- Gris Plata: `#CCCCCC`
- Fondo: `#FFFFFF`

**Tipografía:**
- Inter (Sans Serif)

**Estilo:**
- Clean Medical
- Espaciado generoso
- Bordes redondeados (12px)

---

## 🧪 PROBAR LA DEMO

### Datos de ejemplo rápidos:

```
Email: maria.sanchez@demo.com

Nombre: María Guadalupe Sánchez López
Fecha Nac: 1988-03-15
Teléfono: 3312345678
Alergias: Ninguna
Tipo Sangre: O+

Cirugía: Cesárea programada
Cirujano: Dr. Roberto Pérez Martínez
Fecha: 2025-02-15

Contacto Emergencia:
José Luis Sánchez / 3398765432 / Esposo
```

---

## 📊 PARA LA PRESENTACIÓN

### Puntos Clave:

1. **Sin Configuración**
   - Deploy en 1 minuto
   - Sin base de datos externa
   - Sin variables de entorno

2. **UX Completa**
   - Todo el flujo funcional
   - Firma digital real
   - QR único generado

3. **Diseño Profesional**
   - Branding Hospital Versalles
   - Responsive design
   - Clean medical aesthetic

4. **Escalable a Producción**
   - Fácil migrar a Supabase después
   - Código preparado para backend real
   - Arquitectura modular

---

## 🔄 MIGRACIÓN A PRODUCCIÓN (FUTURO)

Cuando quieras pasar a producción con base de datos real:

1. Instalar Supabase:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. Reemplazar `mock-storage.ts` por clientes de Supabase

3. Ejecutar `supabase/schema.sql` en tu proyecto

4. Configurar variables de entorno

**El resto del código NO cambia.** La arquitectura está lista.

---

## ❓ FAQ

### ¿Los datos se pierden al cerrar el navegador?

No. localStorage persiste entre sesiones. Solo se borran si el usuario limpia los datos del navegador.

### ¿Funciona en móviles?

Sí, 100% responsive. La firma funciona con touch.

### ¿Cuántos usuarios soporta?

Ilimitados. Cada usuario tiene sus datos en su propio navegador.

### ¿Es seguro para una demo real?

Sí, perfecto para demostraciones. No hay riesgo porque los datos no se envían a ningún servidor.

---

## 🎉 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción localmente
npm start

# Verificar tipos
npm run type-check

# Linting
npm run lint
```

---

## 📞 SOPORTE

**Dudas sobre la demo:**
- Email: sistemas@hospitalversalles.com

**Reportar bugs:**
- GitHub Issues del proyecto

---

## ✅ CHECKLIST PRE-PRESENTACIÓN

- [ ] `npm install` ejecutado
- [ ] `npm run dev` funciona
- [ ] Probaste el flujo completo (login → wizard → dashboard)
- [ ] Firmaste en el canvas
- [ ] Viste el QR generado
- [ ] Internet estable (para deploy en vivo si lo harás)

---

**¡Listo para tu demo! 🚀**

Esta versión te permite demostrar el proyecto completo sin depender de servicios externos. Perfecto para presentaciones y pruebas rápidas.

**Desplegar a Vercel = 1 minuto ⚡**
