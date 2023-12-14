import {useCallback, useEffect} from 'react'

import {gtmInquiryFormViewEvent} from '@/common/utils/gtm/gtmInquiryFormEvent'
import {CTA_TEXT, gtmPopupViewedEvent, TypeTypes} from '@/common/utils/gtm/gtmPopupEvent'
import {useNewsletterFormModal} from '@/components/containers/modalTriggerListener/useNewsletterFormModal'
import {usePromoModal} from '@/components/containers/modalTriggerListener/usePromoModal'
import {NewsletterFormModal} from '@/components/forms/newsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {createInquireModalGeneralProps} from '@/components/hooks/useOpenInquiryDispatch'
import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'
import {EVENT_TRIGGER_MODAL, MethodTypes, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'
import {ModalTypes} from '@/sanity/types'
import {setCookie} from '@/utils/cookies/setCookie'

export const ModalTriggerListener = () => {
  const inquireModalProps = useHashRoutedInquiryModal()
  const generalInquireProps = createInquireModalGeneralProps()
  const {openInquireModal} = inquireModalProps
  const {gtmNewsletterSubscriptionViewEvent} = useGtmNewsletterEvent()
  const {newsletterFormProps, openNewsletterModal} = useNewsletterFormModal()
  const {promoModalProps, openPromoModal} = usePromoModal()
  const isModalOpen =
    inquireModalProps.isOpen || newsletterFormProps.isOpen || promoModalProps?.isOpen
  const setPopupCookie = (popupInfo: PopUpInfo) => {
    if (popupInfo && !popupInfo.displayAlways) {
      setCookie(`${popupInfo.campaignName}-${popupInfo.id}`, popupInfo, {}, popupInfo.daysToExpire)
    }
  }

  const modalTriggerListener = useCallback(
    (event: any) => {
      const {detail} = event ?? {}
      const {modalType, props, triggerType, popupInfo} = detail ?? {}

      if (isModalOpen) {
        return
      }

      switch (modalType) {
        case ModalTypes.NEWSLETTER:
          openNewsletterModal(props, triggerType)
          gtmNewsletterSubscriptionViewEvent({
            cta_value: props?.ctaText ?? ModalTypes.NEWSLETTER,
            method: triggerType === ModalTriggerTypes.POPUP ? MethodTypes.POPUP : props?.method,
          })
          if (triggerType === ModalTriggerTypes.POPUP) {
            gtmPopupViewedEvent({
              cta_value: CTA_TEXT.NEWSLETTER,
              method: MethodTypes.CENTER,
              type: TypeTypes.FORM,
            })
          }
          setPopupCookie(popupInfo)
          break

        case ModalTypes.INQUIRE:
          const inquireModalProps = props || generalInquireProps
          const {useAnchor} = props ?? {}

          openInquireModal({inquireModalProps, options: {useAnchor}})
          gtmInquiryFormViewEvent(inquireModalProps)
          setPopupCookie(popupInfo)
          break

        case ModalTypes.PROMO:
          openPromoModal(props)
          gtmPopupViewedEvent({
            cta_value: props.linkText,
            method: MethodTypes.CENTER,
            type: TypeTypes.NON_FORM,
          })
          setPopupCookie(popupInfo)
          break
      }
    },
    [
      generalInquireProps,
      gtmNewsletterSubscriptionViewEvent,
      isModalOpen,
      openInquireModal,
      openNewsletterModal,
      openPromoModal,
    ]
  )

  useEffect(() => {
    if (typeof window !== undefined) {
      window.document.removeEventListener(EVENT_TRIGGER_MODAL, modalTriggerListener)
      window.document.addEventListener(EVENT_TRIGGER_MODAL, modalTriggerListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.document.removeEventListener(EVENT_TRIGGER_MODAL, modalTriggerListener)
      }
    }
  }, [modalTriggerListener])

  return (
    <>
      <NewsletterFormModal {...newsletterFormProps} />
      <RecaptchaInquireFormModal {...inquireModalProps} />
      {promoModalProps && <DzPromoModal {...promoModalProps} />}
    </>
  )
}

export default ModalTriggerListener
