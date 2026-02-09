# reCAPTCHA v3 Integration Guide

## Overview

reCAPTCHA v3 ha sido implementado en todos los formularios del blog para protegerlos contra bots y spam sin afectar la experiencia del usuario.

## What's New

### Frontend Changes (`/client`)

1. **`src/App.jsx`**
   - Agregado `GoogleReCaptchaProvider` como wrapper principal
   - Configurado con la clave del sitio (SITE KEY)

2. **`src/hooks/useRecaptcha.js`** (Nuevo)
   - Hook personalizado para abstrae la lógica de reCAPTCHA
   - Permite que cualquier componente obtenga tokens fácilmente

3. **Formularios Actualizados**
   - `src/pages/ContactMe.jsx`
   - `src/pages/SignIn.jsx`
   - `src/pages/SignUp.jsx`
   - `src/pages/CreatePost.jsx`
   
   Todos obtienen un token antes de enviar el formulario

### Backend Changes (`/api`)

1. **`/api/utils/recaptcha.js`** (Nuevo)
   - Función `verifyRecaptcha()` que:
     - Envía el token a los servidores de Google
     - Valida que sea un usuario legítimo
     - Retorna un score (0.0 - 1.0)
     - El umbral está configurado en 0.5 (ajustable)

2. **Controladores Actualizados**
   - `auth.controller.js` - `signup()` y `signin()`
   - `contact.controller.js` - `createContact()`
   - `post.controller.js` - `createPost()`
   
   Todos verifican el token de reCAPTCHA antes de procesar

## How It Works

### User Flow

1. **Usuario completa el formulario** → Hace click en enviar
2. **Hook `useRecaptcha`** → Obtiene un token (_silencioso, sin UI_)
3. **Token se envía con los datos** → En el body de la request
4. **Backend verifica el token** → Llamada a Google reCAPTCHA API
5. **Google devuelve un score** → 0.0 (bot) - 1.0 (usuario legítimo)
6. **Si score > 0.5** → Formulario se procesa normalmente
7. **Si score ≤ 0.5** → Se rechaza como posible bot

### Configuration

**SITE KEY** (Público - Frontend):
```
6Lc4fWUsAAAAANEYlBahrB-F2kzvgqX-sAUBpYmg
```

**SECRET KEY** (Privado - Backend):
```
6Lc4fWUsAAAAAIGq-n10jPYTLqbnRkLe5hel83s_
```

El threshold actual está configurado en **0.5**. Puedes ajustarlo en `api/utils/recaptcha.js` según tus necesidades.

## Testing

### En Desarrollo

1. Los tokens de reCAPTCHA son válidos para ambientes de desarrollo
2. Abre la consola del navegador para ver el score en logs
3. Si algo falla, revisar que:
   - Las claves sean correctas
   - El sitio esté en la lista de dominios permitidos en Google Cloud
   - La conexión a internet sea estable

### Dominios Permitidos

En Google Cloud Console, debes tener configurados estos dominios:
- `localhost`
- `127.0.0.1`
- Tu dominio en producción (ej: josenicoleno.com)

## Customization

### Cambiar el Threshold (Umbral de Score)

En `api/utils/recaptcha.js`:
```javascript
const threshold = 0.5  // Cambiar este valor (0.0 - 1.0)
```

- **0.0**: Muy permisivo (acepta casi todo)
- **0.5**: Equilibrado (predeterminado)
- **1.0**: Muy restrictivo (solo usuarios "seguros")

### Agregar reCAPTCHA a Más Formularios

1. Importar el hook en el componente:
   ```jsx
   import { useRecaptcha } from '../hooks/useRecaptcha'
   ```

2. Usar en el componente:
   ```jsx
   const { getRecaptchaToken } = useRecaptcha()
   ```

3. En el handleSubmit:
   ```jsx
   const recaptchaToken = await getRecaptchaToken()
   // Enviar token en el body de la request
   ```

4. En el backend controller:
   ```javascript
   import { verifyRecaptcha } from '../utils/recaptcha.js'
   
   const recaptchaResult = await verifyRecaptcha(recaptchaToken)
   if (!recaptchaResult.success) {
     return next(errorHandler(400, 'reCAPTCHA verification failed'))
   }
   ```

## Logs y Debugging

### Frontend

Los logs del reCAPTCHA aparecerán en la consola del navegador:
```javascript
// En useRecaptcha hook
console.error('Error getting reCAPTCHA token:', error)
```

### Backend

Revisar logs de Node en la terminal para ver la validación:
```javascript
// En recaptcha.js
console.error('Error verifying reCAPTCHA:', error)
```

## Seguridad

### Importante ⚠️

1. **NUNCA** compartas la SECRET KEY en el repositorio público
2. La SECRET KEY debe estar en variables de entorno en producción
3. reCAPTCHA v3 es silencioso - los usuarios NO ven nada
4. El score se basa en:
   - Historial de comportamiento del usuario
   - Patrones de navegación
   - Interacciones previas

## Performance

reCAPTCHA v3 tiene un impacto mínimo:
- **Frontend**: Carga asincrónica, no bloquea la UI
- **Backend**: Una llamada HTTP adicional (~100ms)
- **Network**: ~50KB de datos adicionales

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Token undefined | Asegúrate que la Promise se resuelve con `await` |
| "Verification failed" | Verifica que las claves sean correctas |
| Score siempre bajo | Ajusta el threshold o revisa el dominio en Google Cloud |
| reCAPTCHA no carga | Verifica conexión a internet y que el sitio esté en whitelist |

## Referencias

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [React Google reCAPTCHA v3](https://github.com/t49tran/react-google-recaptcha-v3)
- [Google Cloud Console](https://console.cloud.google.com/)
