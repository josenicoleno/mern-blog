# 🔐 reCAPTCHA v3 - Implementación Completada

## ✨ ¿Qué Se Hizo?

Se ha implementado **reCAPTCHA v3** en todos los formularios principales de tu blog:
- ✅ Contacto (ContactMe)
- ✅ Login (SignIn)
- ✅ Registro (SignUp)
- ✅ Crear Post (CreatePost)

La protección es **silenciosa** - los usuarios no ven nada, pero el sistema detecta bots automáticamente.

---

## 🚀 Inicio Rápido

### **Paso 1: Asegurar que el paquete está instalado**

```bash
cd client
npm install  # Si no lo hizo automáticamente
```

### **Paso 2: Iniciar Frontend**

```bash
cd client
npm run dev
```

Acceder a: `http://localhost:5173`

### **Paso 3: Iniciar Backend**

En otra terminal:
```bash
cd api
npm start  # o npm run dev si tienes nodemon
```

---

## 📝 Cambios Realizados

### Frontend (`/client`)

```
✅ src/App.jsx
   - Envuelto con GoogleReCaptchaProvider
   - Agregada constante RECAPTCHA_SITE_KEY

✅ src/hooks/useRecaptcha.js (NUEVO)
   - Hook personalizado para obtener tokens

✅ src/pages/ContactMe.jsx
   - Agregado hook + token en fetch

✅ src/pages/SignIn.jsx
   - Agregado hook + token en fetch

✅ src/pages/SignUp.jsx
   - Agregado hook + token en fetch

✅ src/pages/CreatePost.jsx
   - Agregado hook + token en fetch
```

### Backend (`/api`)

```
✅ api/utils/recaptcha.js (NUEVO)
   - Verifica tokens con Google API

✅ api/controllers/auth.controller.js
   - signup() - Validación reCAPTCHA agregada
   - signin() - Validación reCAPTCHA agregada

✅ api/controllers/contact.controller.js
   - createContact() - Validación reCAPTCHA agregada

✅ api/controllers/post.controller.js
   - createPost() - Validación reCAPTCHA agregada
```

---

## 🔑 Claves de Configuración

**Público (está en el código):**
- SITE KEY: `6Lc4fWUsAAAAANEYlBahrB-F2kzvgqX-sAUBpYmg`

**Privado (en backend):**
- SECRET KEY: `6Lc4fWUsAAAAAIGq-n10jPYTLqbnRkLe5hel83s_`

---

## ⚙️ Configuración en Producción

Para producción, **DEBES proteger la SECRET KEY**:

### 1️⃣ Crear archivo `.env` en `/api`

```bash
cd api
echo "RECAPTCHA_SECRET_KEY=6Lc4fWUsAAAAAIGq-n10jPYTLqbnRkLe5hel83s_" > .env
```

### 2️⃣ Actualizar `api/utils/recaptcha.js`

Cambiar:
```javascript
const RECAPTCHA_SECRET_KEY = '6Lc4fWUsAAAAAIGq-n10jPYTLqbnRkLe5hel83s_'
```

Por:
```javascript
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
```

### 3️⃣ Configurar dominios en Google Cloud

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Seleccionar tu proyecto reCAPTCHA
3. Editar sitio
4. Agregar dominio: `tu-dominio.com`
5. Guardar

---

## 🧪 Testing

### Probar Contacto Rápidamente

```bash
# 1. Frontend en running
# 2. Backend en running
# 3. Ir a: http://localhost:5173/contact-me
# 4. Llenar formulario
# 5. Click "Send message"
# 6. Ver respuesta (success o error)
```

### Ver Logs

**Frontend (DevTools):**
- F12 → Console
- Buscar mensajes de reCAPTCHA

**Backend (Terminal):**
- Buscar logs sobre "reCAPTCHA"
- Ver if success o error

---

## 📋 Archivos de Referencia

1. **`RECAPTCHA_SETUP.md`** - Documentación completa
2. **`TESTING_GUIDE.md`** - Guía de testing
3. **`CHANGES_SUMMARY.md`** - Resumen detallado de cambios

---

## ⚠️ Importante

### NO HAGAS ESTO:

❌ No compartas la SECRET KEY públicamente
❌ No incluyas `.env` en Git
❌ No cambies las claves sin actualizar Google Cloud

### SI HACES ESTO:

✅ Protege el `.env` en producción
✅ Configura dominios permitidos
✅ Ajusta threshold según necesites (default 0.5)

---

## 🎯 Cómo Funciona

```
1. Usuario completa formulario
   ↓
2. Click en enviar → getRecaptchaToken()
   ↓
3. Google devuelve token (silencioso)
   ↓
4. Token se envía con los datos
   ↓
5. Backend verifica token con Google API
   ↓
6. Google devuelve score (0.0 - 1.0)
   ↓
7. Si score > 0.5 → Formulario procesado ✅
   Si score ≤ 0.5 → Rechazado como bot ❌
```

---

## 🚨 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Token undefined | Asegurar que `await` esté en getRecaptchaToken() |
| 400 error | Revisar que las claves sean correctas |
| Formulario se queda en "cargando" | Ver console del navegador (F12) |
| Backend error | Revisar que los imports sean correctos |

---

## 📞 Contacto / Ayuda

Si algo no funciona:

1. Revisar `TESTING_GUIDE.md`
2. Revisar `RECAPTCHA_SETUP.md`
3. Revisar console del navegador (F12)
4. Revisar logs del backend (terminal)

---

## ✅ Checklist Final

- [ ] Cliente (`npm run dev` en `/client`) funciona
- [ ] Backend (`npm start` en `/api`) funciona
- [ ] Prueba ContactMe y ves "Message sent successfully"
- [ ] Prueba SignUp y se crea cuenta
- [ ] Prueba SignIn y se loguea
- [ ] Prueba CreatePost y se crea post
- [ ] No hay errores rojos en DevTools
- [ ] No hay errores en terminal del backend

---

**¡Implementación completada exitosamente!** 🎉

Tus formularios están ahora protegidos contra bots y spam mientras mantienes una excelente experiencia para usuarios legítimos.
