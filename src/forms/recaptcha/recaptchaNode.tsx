import {Ref} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import {env} from '@/env.mjs'

interface RecaptchaNodeProps {
  recaptchaRef: Ref<any>
}

export const RecaptchaNode = ({recaptchaRef}: RecaptchaNodeProps) => (
  <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} />
)

export default RecaptchaNode
