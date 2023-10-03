import {useEffect} from 'react'

import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {EVENT_CTA_CLICKED} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

export const CtaModalListener = () => {
  const {NewsletterFormModal, openClickHandler: newsletterOpenClickHandler} =
    useNewsletterFormModal()

  useEffect(() => {
    const ctaTypesToClickHandlers: Record<string, () => void> = {
      [CtaActions.NEWSLETTER]: newsletterOpenClickHandler,
    }
    const ctaClickListener = (ctaClickEvent: any) => {
      ctaTypesToClickHandlers[ctaClickEvent.detail?.ctaType]?.()
    }

    if (typeof window !== undefined) {
      window.document.addEventListener(EVENT_CTA_CLICKED, ctaClickListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.document.removeEventListener(EVENT_CTA_CLICKED, ctaClickListener)
      }
    }
  }, [newsletterOpenClickHandler])

  return <>{NewsletterFormModal}</>
}

export default CtaModalListener
