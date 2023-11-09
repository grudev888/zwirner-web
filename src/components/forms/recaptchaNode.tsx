import {Ref} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import {RECAPTCHA_ERROR_MESSAGE} from '@/common/constants/commonCopies'
import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import {env} from '@/env.mjs'

interface RecaptchaNodeProps {
  recaptchaRef: Ref<any>
}

export const RecaptchaNode = ({recaptchaRef}: RecaptchaNodeProps) => (
  <ReCAPTCHA
    ref={recaptchaRef}
    size="invisible"
    sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    onErrored={() => {
      GTMErrorMessageEvent({
        error_message: RECAPTCHA_ERROR_MESSAGE,
        type: ErrorType.CAPTCHA,
      })
    }}
  />
)

export default RecaptchaNode
