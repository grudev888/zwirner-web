import {GTMPopupClickText, GTMPopupViewText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'
import {MethodTypes} from '@/events/ModalTriggerEvent'

export enum TypeTypes {
  FORM = 'form',
  NON_FORM = 'non-form',
}

export const LINK_URL_CLOSE = 'close'
export const CTA_TEXT = {
  NEWSLETTER: 'Sign Up',
  PROMO: 'Explore',
} as const

export const gtmPopupViewedEvent = (event_data: {
  cta_value: string
  method: MethodTypes
  type: TypeTypes
}) => {
  gtmEvent(GTMPopupViewText.event, {
    ...GTMPopupViewText,
    event_data,
  })
}

export const gtmPopupClickedEvent = (event_data: {
  cta_value: string
  method: MethodTypes
  type: TypeTypes
  link_url: string
}) => {
  gtmEvent(GTMPopupClickText.event, {
    ...GTMPopupClickText,
    event_data,
  })
}
