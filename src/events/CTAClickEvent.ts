export const EVENT_CTA_CLICKED = 'ctaClickEvent'
import {CtaActions} from '@/sanity/types'

export const CTAClickEvent = (ctaType: CtaActions) => {
  return new CustomEvent(EVENT_CTA_CLICKED, {
    detail: {
      ctaType,
    },
  })
}
