import {useEffect} from 'react'

import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {
  PromoModalProps,
  usePromoModal,
} from '@/components/containers/ctaModalListener/usePromoModal'
import {NewsletterFormModal} from '@/components/forms/newsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {createInquireModalGeneralProps} from '@/components/hooks/useOpenInquiryDispatch'
import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'
import {EVENT_CTA_CLICKED} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

export const CtaModalListener = () => {
  const inquireModalProps = useHashRoutedInquiryModal()
  const generalInquireProps = createInquireModalGeneralProps()
  const {openInquireModal} = inquireModalProps
  const {gtmNewsletterSubscriptionViewEvent} = useGtmNewsletterEvent()
  const {newsletterFormProps, openNewsletterModal} = useNewsletterFormModal()
  const {promoModalProps, openPromoModal} = usePromoModal()

  useEffect(() => {
    const ctaTypesToClickHandlers: Record<string, (props: any) => void> = {
      [CtaActions.NEWSLETTER]: (props) => {
        openNewsletterModal(props)
      },
      [CtaActions.INQUIRE]: (props: any = {}) => {
        const inquireModalProps = props || generalInquireProps
        const {useAnchor} = props ?? {}

        openInquireModal({inquireModalProps, options: {useAnchor}})
      },
      [CtaActions.PROMO]: (props: PromoModalProps) => {
        openPromoModal(props)
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
      <NewsletterFormModal {...newsletterFormProps} />
      <RecaptchaInquireFormModal {...inquireModalProps} />
      {promoModalProps && <DzPromoModal {...promoModalProps} />}
    </>
  )
}

export default CtaModalListener
