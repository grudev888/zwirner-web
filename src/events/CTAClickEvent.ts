export const EVENT_CTA_CLICKED = 'ctaClickEvent'
import {CtaActions} from '@/sanity/types'

export const CTAClickEvent = (ctaType: CtaActions, props?: any) => {
  return new CustomEvent(EVENT_CTA_CLICKED, {
    detail: {
      ctaType,
      props,
    },
  })
}
