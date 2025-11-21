# 🤝 GUÍA DE CONTRIBUCIÓN - Versalles Pass

Guía para desarrolladores que trabajarán en este proyecto.

---

## 📋 ANTES DE EMPEZAR

### **Conocimientos Requeridos**

- ✅ JavaScript/TypeScript (ES6+)
- ✅ React 18+ (Hooks, Context)
- ✅ Next.js 14 (App Router)
- ✅ Tailwind CSS
- ✅ SQL básico (PostgreSQL)
- ✅ Git/GitHub

### **Conocimientos Deseables**

- Supabase (Auth, Database, Storage)
- Row-Level Security (RLS)
- PDF generation (pdf-lib)
- Canvas API (para firma digital)
- Vercel deployment

---

## 🛠️ SETUP DE ENTORNO DE DESARROLLO

### **1. Requisitos del Sistema**

```bash
node >= 18.0.0
npm >= 9.0.0
git >= 2.0.0
```

### **2. Instalación**

```bash
# Clonar
git clone https://github.com/tu-org/versalles-pass.git
cd versalles-pass

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales
```

### **3. Ejecutar en Desarrollo**

```bash
npm run dev
```

Abre http://localhost:3000

---

## 📁 ESTRUCTURA Y ORGANIZACIÓN

### **Convenciones de Nombres**

**Archivos:**
- Componentes: `PascalCase.tsx` (ej: `SignaturePad.tsx`)
- Utilidades: `camelCase.ts` (ej: `validations.ts`)
- Páginas Next.js: `page.tsx` (convención de App Router)
- API Routes: `route.ts` (convención de App Router)

**Variables y Funciones:**
- Variables: `camelCase` (ej: `patientName`)
- Funciones: `camelCase` (ej: `generatePDF()`)
- Componentes: `PascalCase` (ej: `SignaturePad`)
- Constantes: `UPPER_SNAKE_CASE` (ej: `MAX_FILE_SIZE`)

**Tipos TypeScript:**
- Interfaces: `PascalCase` (ej: `Patient`)
- Types: `PascalCase` (ej: `BloodType`)
- Enums: `PascalCase` (ej: `AdmissionStatus`)

---

## 💻 ESTÁNDARES DE CÓDIGO

### **TypeScript**

**Siempre tipar:**
```typescript
// ✅ Correcto
function calculateAge(birthDate: string): number {
  // ...
}

// ❌ Incorrecto
function calculateAge(birthDate) {
  // ...
}
```

**Usar interfaces para objetos:**
```typescript
// ✅ Correcto
interface PatientData {
  name: string
  age: number
}

// ❌ Incorrecto
type PatientData = {
  name: string
  age: number
}
```

**Evitar `any`:**
```typescript
// ✅ Correcto
function handleData(data: Patient): void {
  // ...
}

// ❌ Incorrecto
function handleData(data: any): void {
  // ...
}
```

---

### **React Components**

**Estructura estándar:**
```typescript
// Imports
import { useState } from 'react'
import { Button } from './ui/Button'
import type { Patient } from '@/types'

// Props interface
interface PatientCardProps {
  patient: Patient
  onEdit?: (patient: Patient) => void
}

// Component
export function PatientCard({ patient, onEdit }: PatientCardProps) {
  // State
  const [isEditing, setIsEditing] = useState(false)

  // Handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.(patient)
  }

  // Render
  return (
    <div>
      <h3>{patient.name}</h3>
      <Button onClick={handleEdit}>Editar</Button>
    </div>
  )
}
```

**Usar functional components:**
```typescript
// ✅ Correcto
export function MyComponent({ prop }: Props) {
  return <div>{prop}</div>
}

// ❌ Incorrecto (class components)
export class MyComponent extends React.Component {
  render() {
    return <div>{this.props.prop}</div>
  }
}
```

---

### **Estilos con Tailwind**

**Orden de clases:**
1. Layout (flex, grid, block)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (text-*, font-*)
5. Colors (bg-*, text-*)
6. Effects (shadow, opacity, transition)

```typescript
// ✅ Correcto (orden lógico)
<div className="flex items-center gap-4 px-4 py-2 text-lg font-semibold text-white bg-primary-500 rounded-medical shadow-medical hover:shadow-medical-hover transition-all">

// ❌ Incorrecto (orden aleatorio)
<div className="text-white shadow-medical px-4 bg-primary-500 flex rounded-medical hover:shadow-medical-hover text-lg gap-4 py-2 items-center font-semibold transition-all">
```

**Usar `cn()` para clases condicionales:**
```typescript
import { cn } from '@/lib/utils'

<Button
  className={cn(
    'base-classes',
    isActive && 'active-classes',
    isDisabled && 'disabled-classes'
  )}
/>
```

---

### **Manejo de Errores**

**Siempre usar try-catch en operaciones asíncronas:**
```typescript
// ✅ Correcto
async function fetchPatient(id: string) {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching patient:', error)
    throw error
  }
}
```

**Mostrar errores al usuario:**
```typescript
// ✅ Correcto
try {
  await saveData()
} catch (error) {
  alert('Error al guardar los datos. Intente nuevamente.')
  console.error(error)
}

// ❌ Incorrecto (error silencioso)
try {
  await saveData()
} catch (error) {
  console.log(error)
}
```

---

## 🔐 SEGURIDAD

### **Variables de Entorno**

**NUNCA commitear credenciales:**
```typescript
// ❌ MUY MAL
const supabaseUrl = 'https://abcdefg.supabase.co'
const supabaseKey = 'eyJ...'

// ✅ Correcto
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

### **Validación**

**Validar en cliente Y servidor:**
```typescript
// Cliente (pre-submission)
const validated = personalInfoSchema.parse(formData)

// Servidor (API route)
export async function POST(request: Request) {
  const body = await request.json()
  const validated = personalInfoSchema.parse(body) // Validar de nuevo
  // ...
}
```

### **RLS en Supabase**

**SIEMPRE usar RLS:**
```sql
-- ✅ Correcto
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON patients FOR SELECT
  USING (auth.uid() = user_id);

-- ❌ Incorrecto (sin RLS)
ALTER TABLE patients DISABLE ROW LEVEL SECURITY;
```

---

## 🧪 TESTING

### **Antes de Commitear**

```bash
# Type check
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

**Todo debe pasar sin errores.**

### **Testing Manual Mínimo**

Antes de hacer PR, verifica:

- [ ] Login funciona
- [ ] Wizard completo funciona
- [ ] Firma se captura correctamente
- [ ] PDF se genera
- [ ] QR se muestra
- [ ] No hay errores en consola

---

## 📝 COMMITS

### **Formato de Mensajes**

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(scope): descripción breve

Descripción detallada (opcional)
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, espacios (sin cambio de lógica)
- `refactor`: Refactorización de código
- `test`: Agregar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```bash
feat(signature): agregar soporte para stylus
fix(pdf): corregir encoding de firma en PDF
docs(readme): actualizar instrucciones de setup
style(button): mejorar espaciado de componente
refactor(wizard): simplificar lógica de validación
```

### **Qué Commitear**

**Incluir:**
- ✅ Archivos de código fuente (src/)
- ✅ Configuración (package.json, tsconfig.json, etc.)
- ✅ Documentación (README.md, etc.)

**NO Incluir:**
- ❌ `.env.local` (credenciales)
- ❌ `node_modules/` (dependencias)
- ❌ `.next/` (build)
- ❌ Logs
- ❌ Archivos de IDE (.vscode/, .idea/)

---

## 🌿 BRANCHING STRATEGY

### **Ramas Principales**

- `main`: Código en producción (protegida)
- `develop`: Desarrollo activo (protegida)

### **Ramas de Feature**

```bash
# Crear rama desde develop
git checkout develop
git pull origin develop
git checkout -b feature/descripcion-breve

# Trabajar en la rama
git add .
git commit -m "feat: descripción del cambio"

# Pushear
git push origin feature/descripcion-breve
```

### **Nomenclatura de Ramas**

```
feature/agregar-notificaciones-email
fix/corregir-validacion-telefono
docs/actualizar-guia-instalacion
refactor/optimizar-wizard
```

---

## 🔄 PULL REQUESTS

### **Antes de Crear PR**

- [ ] Código pasa type-check
- [ ] Código pasa lint
- [ ] Build exitoso
- [ ] Testing manual realizado
- [ ] Documentación actualizada
- [ ] Commits con mensajes claros

### **Plantilla de PR**

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Feature (nueva funcionalidad)
- [ ] Fix (corrección de bug)
- [ ] Refactor (refactorización)
- [ ] Docs (documentación)

## Testing
- [ ] Probado localmente
- [ ] Probado en staging (si aplica)
- [ ] Tests automatizados agregados

## Screenshots (si aplica)
[Agrega capturas de pantalla]

## Checklist
- [ ] Código revisado por mí mismo
- [ ] Comentarios agregados donde necesario
- [ ] Documentación actualizada
- [ ] Sin errores de TypeScript
- [ ] Sin warnings de ESLint
```

---

## 🐛 REPORTAR BUGS

### **Formato de Reporte**

```markdown
**Descripción del Bug**
Descripción clara y concisa.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer clic en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento Esperado**
Lo que debería pasar.

**Comportamiento Actual**
Lo que está pasando.

**Screenshots**
Si aplica.

**Entorno**
- OS: [Windows/Mac/Linux]
- Browser: [Chrome 120]
- Versión: [1.0.0]

**Información Adicional**
Cualquier contexto relevante.
```

---

## 🆕 AGREGAR NUEVA FUNCIONALIDAD

### **Checklist**

1. **Planificación**
   - [ ] Definir requisitos
   - [ ] Diseñar arquitectura
   - [ ] Identificar dependencias

2. **Desarrollo**
   - [ ] Crear branch feature
   - [ ] Implementar código
   - [ ] Agregar tipos TypeScript
   - [ ] Agregar validaciones
   - [ ] Manejar errores

3. **Testing**
   - [ ] Testing manual completo
   - [ ] Verificar edge cases
   - [ ] Verificar responsive

4. **Documentación**
   - [ ] Comentar código complejo
   - [ ] Actualizar README si aplica
   - [ ] Agregar a CHANGELOG

5. **Review**
   - [ ] Self-review
   - [ ] Crear PR
   - [ ] Esperar aprobación

---

## 📚 RECURSOS ÚTILES

### **Documentación Oficial**

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Documentación del Proyecto**

- `README.md`: Documentación principal
- `SETUP.md`: Instalación
- `ESTRUCTURA.md`: Arquitectura de archivos
- `CHANGELOG.md`: Historial de versiones

---

## ❓ PREGUNTAS FRECUENTES

### **¿Cómo agrego una nueva página?**

1. Crear archivo en `src/app/nueva-pagina/page.tsx`
2. Exportar componente default
3. Agregar link en navegación

### **¿Cómo agrego un nuevo campo al formulario?**

1. Agregar tipo en `src/types/index.ts`
2. Agregar validación en `src/lib/validations.ts`
3. Agregar campo en `src/app/pre-admission/page.tsx`
4. Agregar columna en DB (si aplica)

### **¿Cómo modifico el PDF generado?**

Editar `src/lib/pdf-generator.ts`

### **¿Cómo cambio los colores del branding?**

Editar `tailwind.config.ts`

---

## 📞 SOPORTE

**Dudas técnicas:**
- Email: sistemas@hospitalversalles.com
- Slack: #versalles-pass-dev (interno)

**Reportar bugs:**
- GitHub Issues: [Link al repo]

---

## ✅ CHECKLIST FINAL

Antes de hacer merge a `main`:

- [ ] Código revisado por al menos 1 persona
- [ ] Tests pasan (cuando se implementen)
- [ ] Build exitoso
- [ ] Documentación actualizada
- [ ] CHANGELOG actualizado
- [ ] Versión bumpeada en package.json
- [ ] Staging probado (si existe)

---

**¡Gracias por contribuir a Versalles Pass! 🚀🏥**

Tu código ayudará a miles de pacientes a tener una mejor experiencia quirúrgica.
