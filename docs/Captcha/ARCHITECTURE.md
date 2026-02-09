# 🏗️ Arquitectura reCAPTCHA v3

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                     NAVEGADOR (Frontend)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │          App.jsx (GoogleReCaptchaProvider)               │   │
│  │                   ↓                                       │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  ContactMe.jsx / SignIn.jsx / SignUp.jsx / ...   │  │   │
│  │  │                   ↓                                │  │   │
│  │  │  useRecaptcha() → getRecaptchaToken()            │  │   │
│  │  │                   ↓                                │  │   │
│  │  │  fetch('/api/...', {                             │  │   │
│  │  │    body: JSON.stringify({                         │  │   │
│  │  │      ...datos,                                    │  │   │
│  │  │      recaptchaToken: 'abc123...'                 │  │   │
│  │  │    })                                             │  │   │
│  │  │  })                                               │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                   ↓                                       │   │
│  │        Espera respuesta del servidor                      │   │
│  │                   ↓                                       │   │
│  │       Muestra éxito o error al usuario                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    TU SERVIDOR (Backend)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  auth.controller.js / contact.controller.js / ...        │   │
│  │                   ↓                                       │   │
│  │  const { recaptchaToken } = req.body                     │   │
│  │                   ↓                                       │   │
│  │  const result = await verifyRecaptcha(recaptchaToken)   │   │
│  │                   ↓                                       │   │
│  │  if (!result.success) {                                  │   │
│  │    return error 400 (posible bot)                        │   │
│  │  }                                                        │   │
│  │                   ↓                                       │   │
│  │  Procesar formulario normalmente                         │   │
│  │  (guardar en BD, enviar email, etc.)                    │   │
│  │                   ↓                                       │   │
│  │  res.json({ success: true })                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                   ↓                                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  api/utils/recaptcha.js → verifyRecaptcha()             │   │
│  │                   ↓                                       │   │
│  │  fetch('google.com/recaptcha/api/siteverify', {         │   │
│  │    method: 'POST',                                       │   │
│  │    body: {                                               │   │
│  │      secret: RECAPTCHA_SECRET_KEY,                      │   │
│  │      response: recaptchaToken                           │   │
│  │    }                                                      │   │
│  │  })                                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│              GOOGLE reCAPTCHA API (servers.                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Valida el token con machine learning                           │
│  Analiza múltiples señales del usuario                          │
│  Devuelve un score (0.0 - 1.0)                                 │
│                                                                   │
│  {                                                               │
│    "success": true,                                              │
│    "score": 0.8,        ← 0.0=bot, 1.0=usuario legítimo       │
│    "action": "submit",                                           │
│    "challenge_ts": "2024-02-09T12:34:56Z",                     │
│    "hostname": "localhost"                                       │
│  }                                                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                             ↓
                      Tu servidor recibe
                      response de Google
                             ↓
                     Compara score con 0.5
                      (threshold)
                             ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
              Score > 0.5         Score ≤ 0.5
                    ↓                   ↓
               PERMITIDO            BLOQUEADO
               Procesa          Rechaza como bot
               formulario       (retorna error 400)
```

---

## Estructura de Carpetas

```
josenicoleno/
├── client/
│   └── src/
│       ├── App.jsx                    ← Configuración de provider
│       ├── hooks/
│       │   └── useRecaptcha.js        ← NUEVO: Hook personalizado
│       └── pages/
│           ├── ContactMe.jsx          ← Actualizado
│           ├── SignIn.jsx             ← Actualizado
│           ├── SignUp.jsx             ← Actualizado
│           └── CreatePost.jsx         ← Actualizado
│
├── api/
│   ├── utils/
│   │   └── recaptcha.js               ← NUEVO: Lógica de verificación
│   └── controllers/
│       ├── auth.controller.js         ← Actualizado (signin/signup)
│       ├── contact.controller.js      ← Actualizado
│       └── post.controller.js         ← Actualizado
│
├── README_RECAPTCHA.md                ← NUEVO: Instrucciones
├── RECAPTCHA_SETUP.md                 ← NUEVO: Documentación
├── TESTING_GUIDE.md                   ← NUEVO: Guía de testing
└── CHANGES_SUMMARY.md                 ← NUEVO: Resumen de cambios
```

---

## Flujo de Datos (Ejemplo: ContactMe)

```
1. Usuario escribe mensaje en ContactMe.jsx
   ┌─────────────────────────────┐
   │ Name: "Juan"                │
   │ Email: "juan@email.com"     │
   │ Message: "Hola!"            │
   └─────────────────────────────┘
          ↓ Click "Send"
          
2. handleSubmit() se ejecuta
   ├─ setLoading(true)
   ├─ const token = await getRecaptchaToken()
   │  └─ Google devuelve: "xyz123..."
   └─ Preparar fetch con los datos
   
3. Fetch a /api/contact/create
   ┌──────────────────────────────────┐
   │ POST /api/contact/create         │
   │ Body: {                          │
   │   name: "Juan",                  │
   │   email: "juan@email.com",       │
   │   content: "Hola!",              │
   │   recaptchaToken: "xyz123..."   │
   │ }                                │
   └──────────────────────────────────┘
          ↓ Network request
          
4. Backend recibe en contact.controller.js
   ├─ Extrae: { recaptchaToken, ...contactData }
   ├─ await verifyRecaptcha(recaptchaToken)
   │  ├─ Envía token a Google
   │  ├─ Google valida y devuelve score
   │  └─ Retorna { success: true, score: 0.85 }
   ├─ if (!success) return error 400
   └─ Procesa contacto normalmente
   
5. Backend envía respuesta
   ┌──────────────────────────────┐
   │ Status: 201                  │
   │ Body: {                      │
   │   message: "Mensaje enviado" │
   │ }                            │
   └──────────────────────────────┘
          ↓
          
6. Frontend maneja respuesta
   ├─ setMessage('')          ← Limpia formulario
   ├─ setSuccess(true)
   ├─ setSuccessMessage(data.message)
   └─ Muestra: "Message sent successfully" ✅
```

---

## Interacción con Google reCAPTCHA

### Request que Backend envía a Google:

```
POST https://www.google.com/recaptcha/api/siteverify

Content-Type: application/x-www-form-urlencoded


### Response que Google devuelve:

```json
{
  "success": true,
  "score": 0.8,
  "action": "submit",
  "challenge_ts": "2024-02-09T14:23:45Z",
  "hostname": "localhost",
  "error-codes": []
}
```

### Qué significa el score:

```
1.0 ├─ Usuario legítimo casi seguro
    ├─ 0.9
    ├─ 0.8
    ├─ 0.7
    ├─ 0.6
    ├─ 0.5 ← THRESHOLD (por defecto)
    ├─ 0.4
    ├─ 0.3
    ├─ 0.2
    ├─ 0.1
0.0 └─ Probabilidad muy alta de bot
```

---

## Variables de Entorno

### Development (`localhost`)


En `app.jsx` está hardcodeado.

### Production

Crear `.env` en `/api`:

Actualizar en `api/utils/recaptcha.js`:

```javascript
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
```


## Configuración de Dominios Permitidos

En [Google Cloud Console](https://console.cloud.google.com/):

```
reCAPTCHA Console → Editar sitio

Dominios:
✓ localhost
✓ 127.0.0.1
✓ josenicoleno.com        ← Agregar tu dominio aquí en prod
✓ www.josenicoleno.com
```
## Decisiones de Diseño

### ✅ Por qué reCAPTCHA v3

| Aspecto | Ventaja |
|---------|---------|
| **User Experience** | Sin fricción (sin checkbox) |
| **Bot Detection** | ML de Google (muy preciso) |
| **Performance** | Request asincrónico (no bloquea) |
| **Costo** | Gratuito en nivel inicial |
| **Mantenimiento** | Google se encarga del modelo |

### ✅ Por qué este threshold (0.5)

- **0.5**: Equilibrio entre strictness y usabilidad
- Usuarios legítimos: scores 0.7-1.0
- Bots típicos: scores 0.0-0.3
- Margen de error: 0.3-0.7

### ✅ Por qué verificar en backend

- **Seguridad**: El frontend puede manipularse (DevTools)
- **Confianza**: Solo el backend conoce la SECRET KEY
- **Validación**: Última línea de defensa

---
**Arquitectura robusta y lista para producción** ✅
