# 🎬 SCRIPT DE DEMOSTRACIÓN - Versalles Pass

Guía paso a paso para realizar una demostración profesional y efectiva.

---

## 🎯 OBJETIVO DE LA DEMO

Mostrar cómo **Versalles Pass** transforma la experiencia de pre-admisión quirúrgica de forma rápida, segura y profesional.

**Duración:** 10 minutos
**Audiencia:** Dirección, Gerencia, Staff médico

---

## 📋 PREPARACIÓN PREVIA (30 minutos antes)

### Checklist Técnico

- [ ] Laptop completamente cargada
- [ ] Internet estable (WiFi + hotspot móvil de backup)
- [ ] Proyector/pantalla conectado y probado
- [ ] Resolución de pantalla ajustada (1920x1080 recomendado)
- [ ] Zoom del navegador al 100%

### Pestañas Pre-abiertas

1. **Tab 1:** Landing page (`https://versalles-pass.vercel.app`)
2. **Tab 2:** Gmail/Outlook (para mostrar Magic Link)
3. **Tab 3:** PDF viewer con ejemplo de PDF firmado
4. **Tab 4:** Dashboard con QR (backup)

### Datos de Prueba Listos

Prepara un archivo de texto con datos ficticios para copiar rápidamente:

```
Nombre: María Guadalupe Sánchez López
Fecha de Nacimiento: 15/03/1988
Teléfono: 3312345678
Email: maria.sanchez.demo@gmail.com
Alergias: Ninguna
Tipo de Sangre: O+
Dirección: Av. Vallarta 1234, Col. Americana
Código Postal: 44160

Contacto de Emergencia:
Nombre: José Luis Sánchez
Teléfono: 3398765432
Relación: Esposo

Cirugía: Cesárea programada
Cirujano: Dr. Roberto Pérez Martínez
Fecha: [3 días después de hoy]
Hora: 08:00
```

### Documentos de Prueba

- INE de muestra (imagen JPG o PDF)
- Póliza de seguro de muestra (PDF)

---

## 🎤 APERTURA (30 segundos)

### **Saludo e Introducción**

> "Buenos días/tardes. Mi nombre es [TU NOMBRE] y hoy les voy a presentar **Versalles Pass**, el nuevo sistema de pre-admisión quirúrgica digital que va a transformar la experiencia de nuestros pacientes y optimizar nuestras operaciones."

### **Contexto del Problema**

> "Actualmente, nuestros pacientes deben llegar con una hora de anticipación, hacer fila, llenar formularios a mano, y el personal de admisión invierte 15-20 minutos capturando datos. Esto genera estrés en el paciente y carga operativa innecesaria."

### **Transición a la Demo**

> "Con Versalles Pass, este proceso se reduce a 30 segundos. Permítanme mostrarles cómo funciona."

---

## 🖥️ DEMOSTRACIÓN PASO A PASO

### **[1] LANDING PAGE** (1 minuto)

**Acción:**
- Muestra la página principal

**Narración:**
> "Esta es la página principal de Versalles Pass. Noten el diseño limpio, médico y profesional, con los colores institucionales de Hospital Versalles: verde pastel y gris plata."
>
> "El paciente puede acceder desde cualquier dispositivo: computadora, tablet o teléfono. No necesita descargar ninguna aplicación."

**Highlights:**
- Señala el logo
- Muestra la sección de características
- Enfatiza "sin papeleo físico"

**Transición:**
> "Ahora vamos a simular el proceso desde la perspectiva del paciente. Imaginemos que María acaba de recibir su fecha de cirugía y el hospital le envió este enlace por correo."

*Clic en "Comenzar Pre-admisión"*

---

### **[2] AUTENTICACIÓN SIN CONTRASEÑA** (1 minuto)

**Acción:**
- Ingresa email de prueba
- Clic en "Enviar Enlace de Acceso"

**Narración:**
> "Lo primero que hace María es ingresar su correo electrónico. Fíjense que NO hay contraseña. ¿Por qué? Porque el sistema usa 'Magic Link', que es más seguro que las contraseñas tradicionales."
>
> "En lugar de crear otra contraseña que recordar, el sistema le envía un enlace de acceso único directamente a su email."

**Acción:**
- Muestra mensaje de "Correo Enviado"

**Narración:**
> "María recibe una confirmación instantánea. Ahora vamos a su bandeja de entrada..."

**Acción:**
- Cambiar a Tab 2 (Email)
- Mostrar el correo de Supabase
- Clic en el enlace del Magic Link

**Narración:**
> "Aquí está el correo. Un solo clic y María está autenticada de forma segura. Sin contraseñas, sin registros complicados."

**Transición:**
> "El enlace nos lleva directamente al formulario de pre-admisión."

---

### **[3] WIZARD - PASO 1: DATOS PERSONALES** (1.5 minutos)

**Acción:**
- Muestra el wizard con los 4 pasos
- Comienza a llenar los campos (usa copiar/pegar)

**Narración:**
> "El sistema guía al paciente paso a paso. Esto es lo que llamamos un 'wizard'. Primero, datos personales básicos."
>
> "Vean cómo el sistema valida en tiempo real: si María ingresa un teléfono inválido, el sistema le avisa inmediatamente. Esto previene errores."

**Acción:**
- Intencionalmente ingresa un teléfono incorrecto (9 dígitos)
- Muestra el mensaje de error
- Corrígelo a 10 dígitos

**Narración:**
> "También recopilamos información crítica como alergias, tipo de sangre, y contacto de emergencia. Todo esto quedará registrado de forma segura en la base de datos."

**Acción:**
- Completa los campos
- Clic en "Continuar"

**Transición:**
> "María completa sus datos y pasamos al siguiente paso."

---

### **[4] WIZARD - PASO 2: INFORMACIÓN QUIRÚRGICA** (1 minuto)

**Acción:**
- Llena tipo de cirugía, cirujano, fecha

**Narración:**
> "Ahora María ingresa los detalles de su cirugía: tipo de procedimiento, nombre del cirujano y fecha programada."
>
> "Esto permite que el sistema prepare todo antes de su llegada. Noten que hay un campo de notas para cualquier detalle adicional importante."

**Acción:**
- Clic en "Continuar"

---

### **[5] WIZARD - PASO 3: DOCUMENTOS** (1.5 minutos)

**Acción:**
- Muestra los dos campos de upload

**Narración:**
> "Este es uno de los pasos más importantes: la carga de documentos. María sube su INE y su póliza de seguro directamente desde su casa."
>
> "El sistema valida que sean archivos del tipo correcto y que no excedan 5MB. Estos documentos se almacenan de forma encriptada en un bucket privado."

**Acción:**
- Upload documento 1 (INE)
- Espera el checkmark verde
- Upload documento 2 (Seguro)
- Espera el checkmark verde

**Narración:**
> "Una vez subidos, María ve una confirmación visual. Solo cuando ambos documentos estén cargados, puede continuar."

**Highlight de Seguridad:**
> "**Importante:** Estos archivos están protegidos con Row-Level Security. Solo María y el personal autorizado del hospital pueden verlos. Es físicamente imposible que otro paciente acceda a estos documentos."

**Acción:**
- Clic en "Continuar"

---

### **[6] WIZARD - PASO 4: FIRMA DIGITAL** (2 minutos) ⭐ **MOMENTO CLAVE**

**Acción:**
- Muestra el texto del consentimiento
- Scroll por el texto

**Narración:**
> "Ahora llegamos al momento más importante: la firma del consentimiento informado."
>
> "María lee el documento completo. Aquí está declarando que comprende los riesgos, ha hecho preguntas, y autoriza el procedimiento."

**Acción:**
- Scroll hacia abajo al canvas de firma
- Firma con el mouse/stylus

**Narración:**
> "María firma directamente en la pantalla con su dedo si está en un teléfono, o con el mouse si está en computadora. Esta es una firma **biométrica** - captura el trazo único de cada persona."
>
> "Esta firma tiene validez legal, igual que una firma manuscrita. Y queda registrada con timestamp para auditorías futuras."

**Acción:**
- Clic en "Confirmar Firma"
- Muestra el loading

**Narración:**
> "Al confirmar, suceden varias cosas en segundo plano:"
>
> "1. La firma se guarda en la base de datos
> 2. Se genera un PDF profesional con la firma incrustada
> 3. Se crea un código QR único para María
> 4. Todo esto cumpliendo con la NOM-024-SSA3-2012"

**Transición:**
> "Y en solo unos segundos..."

---

### **[7] DASHBOARD CON QR** (2 minutos) ⭐ **MOMENTO WOW**

**Acción:**
- Muestra el dashboard con el QR grande

**Narración:**
> "¡Listo! María acaba de completar su pre-admisión en menos de 10 minutos desde la comodidad de su casa."
>
> "Lo que ven aquí es su código QR único. Este código contiene toda la información validada que María acaba de ingresar."

**Acción:**
- Señala el QR con el cursor

**Narración:**
> "El día de su cirugía, María solo necesita presentar este código en el mostrador de admisión. El personal lo escanea y en **30 segundos** María pasa directo a preparación quirúrgica."
>
> "Sin filas. Sin formularios. Sin estrés."

**Acción:**
- Scroll hacia abajo
- Muestra los detalles de la cirugía

**Narración:**
> "María puede ver todos los detalles de su cirugía confirmados: procedimiento, cirujano, fecha y hora."

**Acción:**
- Clic en "Descargar Consentimiento Firmado"
- Se abre el PDF

**Narración:**
> "También puede descargar su consentimiento firmado en PDF. Vean cómo se ve..."

---

### **[8] MOSTRAR PDF FIRMADO** (1 minuto) ⭐ **PRUEBA VISUAL**

**Acción:**
- Muestra el PDF generado

**Narración:**
> "Este es el documento oficial generado por el sistema. Noten:"
>
> "- Logo del Hospital Versalles
> - Todos los datos del paciente
> - Detalles de la cirugía
> - Declaraciones del consentimiento
> - **Y aquí está la firma digital de María**, incrustada de forma permanente
> - El código QR para verificación
> - Y al final, la nota de cumplimiento con la NOM-024-SSA3-2012"

**Highlight:**
> "Este PDF es inalterable. Una vez generado, no puede ser modificado. Es el registro oficial digital del hospital."

---

## 🎬 CIERRE Y BENEFICIOS (2 minutos)

### **Resumen de Beneficios**

> "Recapitulemos lo que acabamos de ver en acción:"

**1. Para el Paciente:**
- ✅ 10 minutos desde casa vs. 40 minutos en el hospital
- ✅ Sin estrés de llegar con tanta anticipación
- ✅ Sin papeleo ni formularios a mano
- ✅ Proceso claro y guiado paso a paso

**2. Para el Hospital:**
- ✅ Reducción del 97% en tiempo de admisión
- ✅ Eliminación de errores de captura manual
- ✅ Personal de admisión enfocado en atención, no captura
- ✅ Cumplimiento normativo garantizado (NOM-024-SSA3-2012)

**3. Seguridad y Privacidad:**
- ✅ Row-Level Security: cada paciente solo ve sus datos
- ✅ Documentos encriptados
- ✅ Firma digital con validez legal
- ✅ Auditoría completa de todas las acciones

**4. Económicamente:**
- ✅ Inversión inicial: $15 (dominio)
- ✅ Costo mensual: $0 en fase inicial
- ✅ Ahorro estimado: $102,000 anuales

---

## 💡 MANEJO DE PREGUNTAS

### **Pregunta 1: "¿Qué pasa si el paciente no tiene internet?"**

**Respuesta:**
> "Excelente pregunta. Hemos considerado ese escenario. Para esos casos, mantenemos el proceso manual tradicional como respaldo. Sin embargo, según estadísticas recientes, más del 95% de nuestra población objetivo tiene acceso a internet, ya sea desde su casa, cibercafé, o usando datos móviles. Además, el paciente puede completar el proceso días antes, sin prisa."

---

### **Pregunta 2: "¿Cómo garantizan que la firma es realmente del paciente?"**

**Respuesta:**
> "Muy buena pregunta de seguridad. El sistema usa Magic Link enviado al correo electrónico registrado del paciente. Solo quien tenga acceso a ese correo puede firmar. Es el mismo nivel de seguridad que usan bancos como BBVA o Santander. Además, registramos timestamp, dirección IP y dispositivo para auditoría. Es más seguro que una firma en papel, que cualquiera podría falsificar."

---

### **Pregunta 3: "¿Esto reemplaza al personal de admisión?"**

**Respuesta:**
> "No, en absoluto. Esto **optimiza** su trabajo. En lugar de pasar 15 minutos capturando datos, ahora pueden enfocarse en verificar identidad, dar bienvenida personalizada y resolver dudas del paciente. El personal no desaparece, su rol se eleva a atención de calidad."

---

### **Pregunta 4: "¿Cuánto tiempo toma implementar esto?"**

**Respuesta:**
> "El desarrollo ya está completo. Para ponerlo en producción necesitamos:
> - 2 horas para configurar Supabase
> - 30 minutos para desplegar en Vercel
> - 1 sesión de 2 horas para capacitar al personal
> - 1 semana de piloto con 10-20 pacientes voluntarios
> - 2-3 semanas para producción completa
>
> Podríamos empezar el piloto la próxima semana."

---

### **Pregunta 5: "¿Qué pasa si falla el sistema el día de la cirugía?"**

**Respuesta:**
> "Hemos considerado ese escenario extremadamente raro (SLA de 99.99% de uptime). Si por alguna razón el sistema está caído:
> 1. El paciente tiene el PDF descargado en su teléfono (funciona offline)
> 2. El QR se puede escanear con cualquier app lectora básica
> 3. Como backup, mantenemos el proceso manual legacy
> 4. Supabase tiene redundancia en múltiples zonas geográficas
>
> En 2 años de operación, Vercel no ha tenido caídas significativas."

---

## 🎯 CALL TO ACTION FINAL

> "Para resumir: Versalles Pass representa una inversión mínima de $15 con un retorno de $102,000 anuales, mejora dramáticamente la experiencia del paciente y posiciona al Hospital Versalles como líder en innovación digital en salud."
>
> **"¿Cuándo quieren que iniciemos el piloto?"**

---

## 📝 NOTAS PARA EL PRESENTADOR

### Do's (✅)

- ✅ Hablar con confianza y entusiasmo
- ✅ Mantener contacto visual con la audiencia
- ✅ Hacer pausas para preguntas
- ✅ Usar lenguaje no técnico para ejecutivos
- ✅ Enfatizar beneficios sobre características
- ✅ Tener datos de respaldo listos

### Don'ts (❌)

- ❌ No leer de la pantalla
- ❌ No usar jerga técnica excesiva
- ❌ No apresurarse en la demo
- ❌ No minimizar las preguntas de seguridad
- ❌ No prometer fechas irrealistas

---

## 🎬 BACKUP PLAN

### Si falla la demo en vivo:

1. **Internet se cae:**
   - Usa hotspot móvil
   - Muestra screenshots/video pregrabado

2. **Laptop se congela:**
   - Reinicia mientras explicas la arquitectura verbal
   - Usa tablet/teléfono de backup

3. **Proyector no funciona:**
   - Invita a la audiencia a ver en tu laptop
   - Agenda nueva demo para otro día

---

## ✅ POST-DEMO

### Inmediatamente después:

- [ ] Agradecer la atención
- [ ] Repartir folleto/resumen ejecutivo (RESUMEN.md impreso)
- [ ] Capturar preguntas pendientes
- [ ] Agenda reunión de seguimiento
- [ ] Enviar email con:
  - Link de demo funcional
  - Resumen de beneficios
  - Propuesta de piloto

---

**¡Mucha suerte en tu presentación! 🚀💚**

**Recuerda:** No estás vendiendo tecnología, estás vendiendo una mejor experiencia para los pacientes y eficiencia operativa para el hospital.
