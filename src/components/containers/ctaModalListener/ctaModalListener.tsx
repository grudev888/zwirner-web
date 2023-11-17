import {useEffect} from 'react'

import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {createInquireModalGeneralProps} from '@/components/hooks/useOpenInquiryDispatch'
import {EVENT_CTA_CLICKED} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

export const CtaModalListener = () => {
  const inquireModalProps = useHashRoutedInquiryModal()
  const generalInquireProps = createInquireModalGeneralProps()
  const {openInquireModal} = inquireModalProps
  const {gtmNewsletterSubscriptionViewEvent} = useGtmNewsletterEvent()
  const {NewsletterFormModal, openClickHandler: newsletterOpenClickHandler} =
    useNewsletterFormModal()

  useEffect(() => {
    const ctaTypesToClickHandlers: Record<string, (props: any) => void> = {
      [CtaActions.NEWSLETTER]: newsletterOpenClickHandler,
      [CtaActions.INQUIRE]: (props: any = {}) => {
        const inquireModalProps = props || generalInquireProps
        const {useAnchor} = props ?? {}

        openInquireModal({inquireModalProps, options: {useAnchor}})
      },
    }

    const ctaClickListener = (ctaClickEvent: any) => {
      const {detail} = ctaClickEvent ?? {}
      const {ctaType, props} = detail ?? {}

      if (ctaType === CtaActions.NEWSLETTER) {
        gtmNewsletterSubscriptionViewEvent({
          cta_value: props?.ctaText ?? ctaType,
          method: props?.method,
        })
      }
      ctaTypesToClickHandlers[ctaType as keyof typeof ctaTypesToClickHandlers]?.(props)
    }

    if (typeof window !== undefined) {
      window.document.addEventListener(EVENT_CTA_CLICKED, ctaClickListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.document.removeEventListener(EVENT_CTA_CLICKED, ctaClickListener)
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {NewsletterFormModal}
      <RecaptchaInquireFormModal {...inquireModalProps} />
    </>
  )
}

export default CtaModalListener
