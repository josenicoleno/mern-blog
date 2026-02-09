import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const getRecaptchaToken = async () => {
    if (!executeRecaptcha) {
      console.log('reCAPTCHA not available yet')
      return null
    }

    try {
      const token = await executeRecaptcha('submit')
      return token
    } catch (error) {
      console.error('Error getting reCAPTCHA token:', error)
      return null
    }
  }

  return { getRecaptchaToken }
}
