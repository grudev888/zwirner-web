import {useEffect} from 'react'

import {gtmInquiryFormViewEvent} from '@/common/utils/gtm/gtmInquiryFormEvent'
import {gtmPopupViewedEvent, MethodTypes, TypeTypes} from '@/common/utils/gtm/gtmPopupEvent'
import {useNewsletterFormModal} from '@/components/containers/modalTriggerListener/useNewsletterFormModal'
import {
  PromoModalProps,
  usePromoModal,
} from '@/components/containers/modalTriggerListener/usePromoModal'
import {NewsletterFormModal} from '@/components/forms/newsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {createInquireModalGeneralProps} from '@/components/hooks/useOpenInquiryDispatch'
import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'
import {EVENT_TRIGGER_MODAL, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {ModalTypes} from '@/sanity/types'

export const ModalTriggerListener = () => {
  const inquireModalProps = useHashRoutedInquiryModal()
  const generalInquireProps = createInquireModalGeneralProps()
  const {openInquireModal} = inquireModalProps
  const {gtmNewsletterSubscriptionViewEvent} = useGtmNewsletterEvent()
  const {newsletterFormProps, openNewsletterModal} = useNewsletterFormModal()
  const {promoModalProps, openPromoModal} = usePromoModal()

  useEffect(() => {
    const modalTypesToClickHandlers: Record<
      string,
      (props: any, triggerType: ModalTriggerTypes) => void
    > = {
      [ModalTypes.NEWSLETTER]: (props, triggerType) => {
        if (triggerType === ModalTriggerTypes.CTA) {
          gtmNewsletterSubscriptionViewEvent({
            cta_value: props?.ctaText ?? ModalTypes.NEWSLETTER,
            method: props?.method,
          })
        }
        if (triggerType === ModalTriggerTypes.POPUP) {
          gtmPopupViewedEvent({
            cta_value: props?.ctaText ?? ModalTypes.NEWSLETTER,
            method: MethodTypes.CENTER,
            type: TypeTypes.FORM,
          })
        }
        openNewsletterModal(props)
      },
      [ModalTypes.INQUIRE]: (props: any = {}, triggerType: ModalTriggerTypes) => {
        const inquireModalProps = props || generalInquireProps
        const {useAnchor} = props ?? {}

        if (triggerType === ModalTriggerTypes.CTA) {
          gtmInquiryFormViewEvent(inquireModalProps)
        }
        if (triggerType === ModalTriggerTypes.POPUP) {
          gtmPopupViewedEvent({
            cta_value: props?.ctaText ?? ModalTypes.INQUIRE,
            method: MethodTypes.CENTER,
            type: TypeTypes.FORM,
          })
        }
        openInquireModal({inquireModalProps, options: {useAnchor}})
      },
      [ModalTypes.PROMO]: (props: PromoModalProps, triggerType: ModalTriggerTypes) => {
        openPromoModal(props)
        if (triggerType === ModalTriggerTypes.POPUP) {
          gtmPopupViewedEvent({
            cta_value: ModalTypes.PROMO,
            method: MethodTypes.CENTER,
            type: TypeTypes.FORM,
          })
        }
      },
    }

    const modalTriggerListener = (event: any) => {
      const {detail} = event ?? {}
      const {modalType, props, triggerType} = detail ?? {}

      modalTypesToClickHandlers[modalType as keyof typeof modalTypesToClickHandlers]?.(
        props,
        triggerType
      )
    }

    if (typeof window !== undefined) {
      window.document.addEventListener(EVENT_TRIGGER_MODAL, modalTriggerListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.document.removeEventListener(EVENT_TRIGGER_MODAL, modalTriggerListener)
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

export default ModalTriggerListener
