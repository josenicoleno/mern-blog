# Quick Start: Pruebas de reCAPTCHA v3

## 🚀 Verificación Rápida

### 1️⃣ Instalación (Ya hecha)
```bash
npm install react-google-recaptcha-v3
```

### 2️⃣ Iniciar el Servidor

**Terminal 1 - Cliente:**
```bash
cd client
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd api
npm start
# O si usas el script nodemon
npm run dev
```

### 3️⃣ Probar cada Formulario

#### **A. Formulario de Contacto**
1. Ir a: `http://localhost:5173/contact-me`
2. Llenar campos (name, email, message)
3. Hacer clic en "Send message"
4. ✅ Debe cambiar a "Message sent successfully"
5. ❌ Si falla: Revisar consola del navegador

#### **B. Sign In**
1. Ir a: `http://localhost:5173/sign-in`
2. Ingresar credenciales válidas
3. Hacer clic en "Sign in"
4. ✅ Debe redirigir a home
5. ❌ Si falla: Ver error en el formulario

#### **C. Sign Up**
1. Ir a: `http://localhost:5173/sign-up`
2. Llenar formulario (username, email, password)
3. Hacer clic en "Sign up"
4. ✅ Debe redirigir a sign-in
5. ❌ Si falla: Ver error en el formulario

#### **D. Create Post** (Requiere admin)
1. Logearse primero
2. Ir a: `http://localhost:5173/create-post`
3. Llenar formulario (title, category, content, etc.)
4. Hacer clic en "Publish"
5. ✅ Debe crear el post y redirigir
6. ❌ Si falla: Ver error en el formulario

---

## 🔍 Debugging

### En el Navegador (DevTools)

**Console (F12):**
```javascript
// Si todo funciona, NO verás errores de reCAPTCHA
// Si hay error, verás:
// "Error getting reCAPTCHA token: [error]"
```

**Network Tab:**
1. Abre DevTools → Network
2. Completa un formulario
3. Busca requests a `siteverify`
   - Debe haber una request POST a Google
   - Response: `{"success": true, "score": 0.X}`

### En el Backend (Terminal)

**Logs de Node:**
```
// Si todo funciona, verás:
[Success] reCAPTCHA verified

// Si falla, verás:
[Error] Error verifying reCAPTCHA: [error]
```

---

## ⚠️ Problemas Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "reCAPTCHA not available yet" | El provider no cargó | Esperar o refrescar página |
| 400 "reCAPTCHA verification failed" | Token inválido | Revisar que las claves sean correctas |
| CORS error | Problema de dominio | Verificar en Google Cloud Console |
| "Cannot GET /api/contact/create" | Backend no corre | Iniciar servidor Node |
| Formulario se queda "cargando" | Token no devuelve | Revisar consola del navegador |

---

## ✅ Checklist de Validación

- [ ] Cliente compila sin errores
- [ ] Backend corre sin errores
- [ ] Formulario de contacto funciona
- [ ] Sign in + reCAPTCHA funciona
- [ ] Sign up + reCAPTCHA funciona
- [ ] Create post + reCAPTCHA funciona
- [ ] Console del navegador sin errores
- [ ] Network shows successful POST to Google API
- [ ] Response tiene `"success": true`

---

## 📊 Qué Esperar

### Score Normal de Usuario
- **0.9 - 1.0**: Usuario legítimo muy probable
- **0.5 - 0.8**: Usuario legítimo probable
- **0.2 - 0.5**: Actividad sospechosa
- **0.0 - 0.2**: Probabilidad de bot

### En Desarrollo
- Scores varían según el comportamiento en el navigate
- Primeros intentos suelen tener score más bajo
- Usuarios "consistentes" obtienen scores altos

---

## 🎯 Configuración de Prueba

**Datos de Prueba (Sin reCAPTCHA):**
```javascript
// Para probar sin reCAPTCHA (solo si necesitas)
// En desarrollo, agregar en env:
REACT_APP_SKIP_RECAPTCHA=true

// Luego en ContactMe.jsx:
if (process.env.REACT_APP_SKIP_RECAPTCHA) {
  recaptchaToken = 'test-token'
}
```

**NO RECOMENDADO** - Mejor desactiva JavaScript en DevTools y prueba manualmente.

---

## 🚨 Si Algo No Funciona

### Paso 1: Verificar Instalación
```bash
# En client/
ls node_modules/react-google-recaptcha-v3
```

### Paso 2: Verificar Imports
```bash
# En cada archivo que usa el hook:
grep -n "useRecaptcha" src/pages/*.jsx
```

### Paso 3: Verificar Backend
```bash
# En api/
grep -n "verifyRecaptcha" controllers/*.js
```

### Paso 4: Revisar Consolas
- Console del navegador (F12)
- Terminal del backend
- Network tab de DevTools

### Paso 5: Contactar
- Revisar `RECAPTCHA_SETUP.md` para más detalles
- Revisar `CHANGES_SUMMARY.md` para cambios realizados

---

**Última actualización:** 9 de febrero de 2026
