import {useCallback, useEffect} from 'react'

import {gtmInquiryFormViewEvent} from '@/common/utils/gtm/gtmInquiryFormEvent'
import {useNewsletterFormModal} from '@/components/containers/modalTriggerListener/useNewsletterFormModal'
import {usePromoModal} from '@/components/containers/modalTriggerListener/usePromoModal'
import {NewsletterFormModal} from '@/components/forms/newsletterFormModal'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {createInquireModalGeneralProps} from '@/components/hooks/useOpenInquiryDispatch'
import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'
import {EVENT_TRIGGER_MODAL, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
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
          openNewsletterModal(props)
          if (triggerType === ModalTriggerTypes.CTA) {
            gtmNewsletterSubscriptionViewEvent({
              cta_value: props?.ctaText ?? ModalTypes.NEWSLETTER,
              method: props?.method,
            })
          }
          setPopupCookie(popupInfo)
          break

        case ModalTypes.INQUIRE:
          const inquireModalProps = props || generalInquireProps
          const {useAnchor} = props ?? {}

          openInquireModal({inquireModalProps, options: {useAnchor}})
          if (triggerType === ModalTriggerTypes.CTA) {
            gtmInquiryFormViewEvent(inquireModalProps)
          }
          setPopupCookie(popupInfo)
          break

        case ModalTypes.PROMO:
          openPromoModal(props)
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
