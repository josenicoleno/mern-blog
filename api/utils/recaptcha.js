const RECAPTCHA_SECRET_KEY = "6Lc4fWUsAAAAAIGq-n10jPYTLqbnRkLe5hel83s_"

export const verifyRecaptcha = async (token) => {
  if (!token) {
    return { success: false, score: 0, error: 'No reCAPTCHA token provided' }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    })

    const data = await response.json()

    // reCAPTCHA v3 devuelve un score entre 0.0 y 1.0
    // 1.0 es muy probable que sea un usuario legítimo
    // 0.0 es muy probable que sea un bot
    const threshold = 0.5

    if (!data.success) {
      return { success: false, score: 0, error: 'reCAPTCHA verification failed' }
    }

    if (data.score < threshold) {
      return { success: false, score: data.score, error: 'Possible bot activity detected' }
    }

    return { success: true, score: data.score }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error)
    return { success: false, score: 0, error: 'Error during verification' }
  }
}
