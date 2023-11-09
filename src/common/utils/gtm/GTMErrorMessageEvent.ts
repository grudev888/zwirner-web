import {GTMErrorMessageText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export enum ErrorType {
  PAYMENT = 'Payment',
  SYSTEM = 'System',
  FORM = 'Form',
  CAPTCHA = 'Captcha',
}

export const GTMErrorMessageEvent = (event_data: {error_message: string; type: ErrorType}) => {
  gtmEvent(GTMErrorMessageText.event, {
    ...GTMErrorMessageText,
    event_data,
  })
}
