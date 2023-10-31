import {FORM_MODAL_TYPES} from '@zwirner/design-system'
import {useEffect} from 'react'

import {
  INQUIRE,
  TO_LEARN_MORE_ABOUT_AVAILABLE_WORKS_EXTENDED,
} from '@/common/constants/commonCopies'
import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {EVENT_CTA_CLICKED} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

export const CtaModalListener = () => {
  const inquireModalProps = useHashRoutedInquiryModal(undefined, false)
  const {gtmNewsletterSubscriptionViewEvent} = useGtmNewsletterEvent()
  const {NewsletterFormModal, openClickHandler: newsletterOpenClickHandler} =
    useNewsletterFormModal()

  useEffect(() => {
    const ctaTypesToClickHandlers: Record<string, () => void> = {
      [CtaActions.NEWSLETTER]: newsletterOpenClickHandler,
      [CtaActions.INQUIRE]: inquireModalProps.openClickHandler,
    }
    const ctaClickListener = (ctaClickEvent: any) => {
      const eventObject = {
        cta_value: ctaClickEvent.detail?.props?.ctaText ?? ctaClickEvent.detail?.ctaType,
        method: ctaClickEvent.detail?.props?.method,
      }
      if (ctaClickEvent.detail?.ctaType === CtaActions.NEWSLETTER) {
        gtmNewsletterSubscriptionViewEvent(eventObject)
      }
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
  }, [
    inquireModalProps.openClickHandler,
    gtmNewsletterSubscriptionViewEvent,
    newsletterOpenClickHandler,
  ])

  return (
    <>
      {NewsletterFormModal}
      <RecaptchaInquireFormModal
        type={FORM_MODAL_TYPES.INQUIRE}
        {...inquireModalProps}
        title={INQUIRE}
        subtitle={TO_LEARN_MORE_ABOUT_AVAILABLE_WORKS_EXTENDED}
      />
    </>
  )
}

export default CtaModalListener
