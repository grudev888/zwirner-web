export const EVENT_CTA_CLICKED = 'ctaClickEvent'
import {CtaActions} from '@/sanity/types'

export const CTAClickEvent = (ctaType: CtaActions, extraProps?: any) => {
  return new CustomEvent(EVENT_CTA_CLICKED, {
    detail: {
      ctaType,
      props: extraProps,
    },
  })
}
