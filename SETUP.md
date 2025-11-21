# ⚡ SETUP RÁPIDO - Versalles Pass

Guía de instalación express para tener el proyecto funcionando en **menos de 30 minutos**.

---

## 📋 PRE-REQUISITOS

Verifica que tengas instalado:

```bash
node --version   # v18.0.0 o superior
npm --version    # v9.0.0 o superior
git --version    # Cualquier versión reciente
```

Si no los tienes, instala desde:
- **Node.js:** https://nodejs.org/
- **Git:** https://git-scm.com/

---

## 🚀 PASOS DE INSTALACIÓN

### **1. Clonar e Instalar (2 minutos)**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/versalles-pass.git
cd versalles-pass

# Instalar dependencias
npm install
```

### **2. Configurar Supabase (10 minutos)**

#### **2.1. Crear Proyecto en Supabase**

1. Ve a https://app.supabase.com
2. Clic en **"New Project"**
3. Completa:
   - **Name:** `versalles-pass`
   - **Database Password:** (genera una segura)
   - **Region:** Closest to you (ej: South America)
4. Espera ~2 minutos a que se cree el proyecto

#### **2.2. Ejecutar Schema SQL**

1. En tu proyecto de Supabase, ve a **SQL Editor** (menú izquierdo)
2. Clic en **"New Query"**
3. Copia TODO el contenido del archivo `supabase/schema.sql`
4. Pégalo en el editor
5. Clic en **"Run"** (esquina inferior derecha)
6. Verifica que diga "Success" y veas las tablas creadas

#### **2.3. Configurar Storage**

1. Ve a **Storage** en el menú
2. Clic en **"Create Bucket"**
3. Configuración:
   - **Name:** `private-docs`
   - **Public bucket:** ❌ **NO** (déjalo desmarcado)
   - Clic en **"Create Bucket"**

#### **2.4. Obtener Credenciales**

1. Ve a **Settings → API** (menú izquierdo)
2. Copia estos dos valores:
   - **Project URL** (ej: `https://abcdefg.supabase.co`)
   - **anon/public key** (es el más largo, empieza con `eyJ...`)

### **3. Configurar Variables de Entorno (1 minuto)**

```bash
# Copiar archivo de ejemplo
cp .env.local.example .env.local

# Abrir con tu editor favorito
code .env.local  # VS Code
# o
notepad .env.local  # Notepad
```

Edita `.env.local` y pega tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...TU-KEY-AQUI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:** Guarda el archivo.

### **4. Configurar Autenticación en Supabase (2 minutos)**

1. En Supabase, ve a **Authentication → URL Configuration**
2. En **Site URL**, pon: `http://localhost:3000`
3. En **Redirect URLs**, agrega estas dos líneas (una por una):
   ```
   http://localhost:3000/api/auth/callback
   http://localhost:3000/pre-admission
   ```
4. Clic en **"Save"**

### **5. Ejecutar el Proyecto (30 segundos)**

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

🎉 **¡Listo!** Deberías ver la landing page de Versalles Pass.

---

## ✅ VERIFICAR QUE TODO FUNCIONE

### **Test 1: Landing Page**
- ✅ Se ve la página principal
- ✅ Los colores son verde pastel y gris plata
- ✅ Botón "Comenzar Pre-admisión" funciona

### **Test 2: Login**
- ✅ Al hacer clic en login, redirige a `/login`
- ✅ Ingresar un email y hacer clic en "Enviar Enlace"
- ✅ Aparece mensaje "Correo Enviado"
- ✅ Revisar bandeja de entrada (puede tardar 1-2 minutos)

### **Test 3: Magic Link**
- ✅ Abrir el correo de Supabase
- ✅ Hacer clic en el enlace
- ✅ Redirige a `/pre-admission`
- ✅ Se ve el formulario wizard

### **Test 4: Formulario Completo**
- ✅ Completar Paso 1 (datos personales)
- ✅ Completar Paso 2 (información quirúrgica)
- ✅ Subir documentos en Paso 3 (usa imágenes de prueba)
- ✅ Firmar en Paso 4
- ✅ Se genera el PDF y redirige a dashboard
- ✅ Aparece el código QR

---

## 🐛 PROBLEMAS COMUNES

### **Error: "Cannot find module"**

```bash
# Borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### **Error: "Invalid Supabase URL"**

- Verifica que copiaste bien la URL (sin espacios)
- Debe empezar con `https://`
- Debe terminar con `.supabase.co`

### **El Magic Link no llega**

1. Revisa spam/correo no deseado
2. Espera 2-3 minutos
3. Verifica en Supabase que el Email Provider esté habilitado:
   - **Authentication → Providers**
   - **Email** debe estar en verde (ON)

### **Error al subir documentos**

1. Verifica que el bucket `private-docs` exista
2. Confirma que esté como **privado** (no público)
3. Revisa las políticas de RLS en **Storage → Policies**

### **La firma no se guarda**

- Verifica que estés firmando en el canvas (debe haber trazos)
- Haz clic en "Confirmar Firma"
- Revisa la consola del navegador (F12) por errores

---

## 📦 DESPLIEGUE A PRODUCCIÓN (Vercel)

### **Opción A: Desde la Terminal**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel

# Seguir las instrucciones en pantalla
# Cuando pregunte por environment variables, pega:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### **Opción B: Desde GitHub**

1. Sube tu código a GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tu-usuario/versalles-pass.git
   git push -u origin main
   ```

2. Ve a https://vercel.com
3. Clic en **"Import Project"**
4. Selecciona tu repo de GitHub
5. Configura las environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` (usa tu dominio de Vercel)
6. Clic en **"Deploy"**

### **Actualizar URLs en Supabase (IMPORTANTE)**

Una vez desplegado en Vercel (ej: `https://versalles-pass.vercel.app`):

1. Ve a **Authentication → URL Configuration** en Supabase
2. Actualiza:
   - **Site URL:** `https://versalles-pass.vercel.app`
   - **Redirect URLs:**
     ```
     https://versalles-pass.vercel.app/api/auth/callback
     https://versalles-pass.vercel.app/pre-admission
     ```
3. **Save**

---

## 📞 SOPORTE

Si tienes problemas:

1. Revisa los **logs** del servidor:
   ```bash
   npm run dev
   # Observa la terminal por errores
   ```

2. Revisa la **consola del navegador** (F12 → Console)

3. Revisa los **logs de Supabase**:
   - **Logs → Query logs** (para errores de DB)
   - **Storage → Logs** (para errores de archivos)

4. Consulta el README.md completo para más detalles

---

## ✨ SIGUIENTE PASO

Una vez que todo funcione localmente:

1. Invita a 2-3 personas de prueba
2. Pídeles que completen una pre-admisión
3. Recopila feedback
4. Haz ajustes si es necesario
5. Despliega a producción
6. Presenta a la dirección del hospital

---

**¡Éxito con Versalles Pass! 🚀🏥**
