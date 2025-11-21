# ✅ CHECKLIST PRE-DESPLIEGUE - Versalles Pass

Lista de verificación completa antes de desplegar a producción.

---

## 🗄️ BASE DE DATOS

### Supabase - Configuración

- [ ] Proyecto de Supabase creado
- [ ] Schema SQL ejecutado sin errores
- [ ] Tablas verificadas:
  - [ ] `patients`
  - [ ] `admissions`
  - [ ] `documents`
  - [ ] `audit_log`
- [ ] Índices creados correctamente
- [ ] Triggers funcionando (updated_at)
- [ ] Función `generate_unique_qr()` creada

### Row-Level Security (RLS)

- [ ] RLS habilitado en todas las tablas
- [ ] Políticas de SELECT configuradas
- [ ] Políticas de INSERT configuradas
- [ ] Políticas de UPDATE configuradas
- [ ] Políticas de DELETE configuradas (solo documents)
- [ ] Prueba: Usuario A no puede ver datos de Usuario B ✅

### Storage

- [ ] Bucket `private-docs` creado
- [ ] Configurado como **privado** (no público)
- [ ] Políticas de storage configuradas:
  - [ ] Upload policy
  - [ ] View policy
  - [ ] Delete policy
- [ ] Límite de tamaño: 5MB por archivo
- [ ] Tipos MIME permitidos: PDF, JPG, PNG

---

## 🔐 AUTENTICACIÓN

### Supabase Auth

- [ ] Email Provider habilitado
- [ ] Magic Link configurado
- [ ] Site URL configurada correctamente:
  - Desarrollo: `http://localhost:3000`
  - Producción: `https://tu-dominio.vercel.app`
- [ ] Redirect URLs configuradas:
  - [ ] `/api/auth/callback`
  - [ ] `/pre-admission`
- [ ] Plantilla de email personalizada (opcional)
- [ ] Rate limiting configurado (prevenir spam)

### Pruebas de Auth

- [ ] Magic Link llega al email
- [ ] Enlace redirige correctamente
- [ ] Session persiste al recargar página
- [ ] Logout funciona correctamente
- [ ] Rutas protegidas no accesibles sin auth

---

## 🌐 VARIABLES DE ENTORNO

### Archivo `.env.local`

- [ ] Archivo creado (no commitear a Git)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurado
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurado
- [ ] `NEXT_PUBLIC_APP_URL` apunta al dominio correcto
- [ ] Sin espacios ni caracteres extra en los valores

### Vercel (Producción)

- [ ] Variables configuradas en Vercel Dashboard
- [ ] Mismos nombres que en `.env.local`
- [ ] URL de producción actualizada
- [ ] Variables encriptadas por Vercel ✅

---

## 💻 CÓDIGO

### Validación TypeScript

```bash
npm run type-check
```

- [ ] Sin errores de tipo
- [ ] Todas las props tipadas correctamente
- [ ] Interfaces exportadas desde `types/index.ts`

### Linting

```bash
npm run lint
```

- [ ] Sin errores críticos de ESLint
- [ ] Warnings resueltos o justificados

### Build de Producción

```bash
npm run build
```

- [ ] Build exitoso sin errores
- [ ] Tamaño de bundles aceptable
- [ ] Páginas pre-renderizadas correctamente

---

## 🧪 TESTING FUNCIONAL

### Flujo Completo - Usuario Nuevo

- [ ] **Landing Page** (`/`)
  - [ ] Se carga correctamente
  - [ ] Colores de branding correctos (verde + gris)
  - [ ] Botones funcionan

- [ ] **Login** (`/login`)
  - [ ] Formulario de email funciona
  - [ ] Validación de email correcto
  - [ ] Mensaje de confirmación aparece
  - [ ] Magic Link llega al email (revisar spam)

- [ ] **Callback Auth** (`/api/auth/callback`)
  - [ ] Redirección automática funciona
  - [ ] Usuario autenticado correctamente

- [ ] **Wizard - Paso 1** (Datos Personales)
  - [ ] Todos los campos se muestran
  - [ ] Validaciones funcionan en tiempo real
  - [ ] Errores se muestran correctamente
  - [ ] Datos se guardan en DB
  - [ ] Transición al Paso 2 funciona

- [ ] **Wizard - Paso 2** (Información Quirúrgica)
  - [ ] Formulario se carga
  - [ ] Validaciones funcionan
  - [ ] Botón "Atrás" funciona
  - [ ] Datos se guardan en DB
  - [ ] Transición al Paso 3 funciona

- [ ] **Wizard - Paso 3** (Documentos)
  - [ ] Componente de upload se muestra (x2)
  - [ ] Validación de tipo de archivo funciona
  - [ ] Validación de tamaño funciona (5MB max)
  - [ ] Upload a Storage exitoso
  - [ ] Registro en tabla `documents` creado
  - [ ] Checkmark de "subido" aparece
  - [ ] Botón "Continuar" solo activo con ambos docs

- [ ] **Wizard - Paso 4** (Firma)
  - [ ] Canvas de firma se carga
  - [ ] Firma con mouse funciona
  - [ ] Firma con touch funciona (mobile)
  - [ ] Botón "Limpiar" funciona
  - [ ] Validación de firma no vacía
  - [ ] PDF se genera correctamente
  - [ ] QR único se genera
  - [ ] Redirección a dashboard

- [ ] **Dashboard** (`/dashboard`)
  - [ ] Datos del paciente correctos
  - [ ] QR se muestra correctamente
  - [ ] PDF descargable funciona
  - [ ] Botón logout funciona

### Flujo - Usuario Recurrente

- [ ] Login con email existente
- [ ] Datos personales precargados
- [ ] Puede editar información
- [ ] Nueva admisión se crea correctamente

### Casos Edge

- [ ] Usuario intenta acceder a `/pre-admission` sin auth → Redirige a `/login`
- [ ] Usuario intenta acceder a `/dashboard` sin completar admisión → Error claro
- [ ] Archivo >5MB → Error de validación
- [ ] Archivo tipo no permitido → Error de validación
- [ ] Firma vacía → Error de validación
- [ ] Internet lento → Loading states funcionan
- [ ] Sesión expira → Redirige a login

---

## 📱 RESPONSIVE DESIGN

### Desktop (>1024px)

- [ ] Layout se ve bien
- [ ] Wizard ocupa ancho correcto
- [ ] Botones alineados correctamente

### Tablet (768px - 1024px)

- [ ] Formulario adaptado
- [ ] Grids de 2 columnas funcionan

### Mobile (< 768px)

- [ ] Formulario en 1 columna
- [ ] Canvas de firma táctil funciona
- [ ] QR se ve en tamaño adecuado
- [ ] Navegación funcional

---

## 🌐 NAVEGADORES

Probar en:

- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Chromium)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

---

## 🚀 DEPLOYMENT

### Vercel

- [ ] Proyecto conectado a GitHub
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado (opcional)
- [ ] Build hooks configurados (opcional)
- [ ] Deploy exitoso
- [ ] URL de producción funcionando

### DNS (si aplica)

- [ ] Dominio apuntando a Vercel
- [ ] SSL/TLS certificado activo (HTTPS)
- [ ] WWW redirige a no-WWW o viceversa

---

## 📊 MONITOREO

### Analytics (opcional pero recomendado)

- [ ] Google Analytics configurado
- [ ] Eventos clave rastreados:
  - Login exitoso
  - Admisión completada
  - PDF descargado
  - Errores de validación

### Error Tracking (opcional)

- [ ] Sentry o similar configurado
- [ ] Errores del cliente capturados
- [ ] Errores del servidor capturados

---

## 📄 DOCUMENTACIÓN

- [ ] README.md completo y actualizado
- [ ] SETUP.md con instrucciones claras
- [ ] PRESENTACION.md preparado
- [ ] RESUMEN.md para ejecutivos
- [ ] Comentarios en código en español
- [ ] Variables de entorno documentadas

---

## 🔐 SEGURIDAD

### Checklist de Seguridad

- [ ] RLS verificado en producción
- [ ] Credenciales NO en el código fuente
- [ ] HTTPS forzado en producción
- [ ] Headers de seguridad configurados
- [ ] Rate limiting en auth activo
- [ ] Backups automáticos habilitados (Supabase)
- [ ] Política de retención de datos definida

### Prueba de Penetración Básica

- [ ] No se puede acceder a datos de otros usuarios
- [ ] SQL injection bloqueado (Supabase lo maneja)
- [ ] XSS no posible (React lo sanitiza)
- [ ] CSRF tokens configurados (Next.js lo maneja)

---

## 👥 CAPACITACIÓN

- [ ] Manual de usuario creado
- [ ] Video tutorial grabado (opcional)
- [ ] Sesión de capacitación al staff programada
- [ ] FAQ preparado para soporte

---

## 📞 SOPORTE

- [ ] Email de soporte configurado
- [ ] Teléfono de contacto actualizado
- [ ] Protocolo de escalamiento definido
- [ ] Horarios de soporte comunicados

---

## 🎉 PRE-LANZAMIENTO

### Comunicación

- [ ] Email a pacientes programados
- [ ] Post en redes sociales del hospital
- [ ] Actualización en sitio web corporativo
- [ ] Cartelería en hospital (opcional)

### Plan de Contingencia

- [ ] Proceso manual legacy documentado (backup)
- [ ] Contacto técnico disponible durante primeros días
- [ ] Rollback plan definido (si algo falla)

---

## ✅ APROBACIÓN FINAL

Firmas de aprobación:

- [ ] **Desarrollador:** Verificó funcionalidad técnica
- [ ] **Líder de TI:** Aprobó seguridad e infraestructura
- [ ] **Staff de Admisión:** Probó flujo completo
- [ ] **Dirección Médica:** Aprobó cumplimiento normativo
- [ ] **Dirección General:** Autoriza lanzamiento

---

## 🚦 GO/NO-GO DECISION

**Criterios para lanzar:**

- ✅ Todos los ítems críticos completados
- ✅ Pruebas funcionales exitosas
- ✅ Personal capacitado
- ✅ Plan de contingencia listo

**Si alguno de estos falla → NO GO, resolver primero**

---

## 📅 POST-LANZAMIENTO

### Primera Semana

- [ ] Monitoreo diario de errores
- [ ] Recopilación de feedback
- [ ] Soporte extendido disponible

### Primer Mes

- [ ] Análisis de métricas de adopción
- [ ] Ajustes según feedback
- [ ] Planificación de Fase 2

---

**Última actualización:** [FECHA]
**Responsable:** [NOMBRE]
**Estado:** [ ] En Progreso | [ ] Listo para Deploy

---

**Una vez completado todo: ¡DESPLEGAR! 🚀**
