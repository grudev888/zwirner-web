import {useRef, useState} from 'react'

import {
  CLOSE,
  EXPECT_THE_LATEST_INFORMATION,
  JOIN_OUR_MAILING_LIST,
  JOIN_OUR_MAILING_LIST_ERROR,
  JOIN_OUR_MAILING_LIST_SUCCESS,
  SIGN_UP,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import {gtmPopupClickedEvent, TypeTypes} from '@/common/utils/gtm/gtmPopupEvent'
import {captchaInitObserver, removeCaptchaObserver} from '@/common/utils/recaptcha/observer'
import RecaptchaNode from '@/components/forms/recaptchaNode'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {MethodTypes, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'
import {sendSubscribeRequest} from '@/services/subscribeService'

type Props = {
  disableBackdrop?: boolean
}

type ModalProps = {
  subtitle: PopUpInfo['description']
  title: PopUpInfo['title']
  image: PopUpInfo['image']
  primaryCTA: PopUpInfo['primaryCTA']
} | null

export const useNewsletterFormModal = (props?: Props) => {
  const {disableBackdrop = false} = props ?? {}
  const [isOpen, setIsOpen] = useState(false)
  const [customModalProps, setCustomModalProps] = useState<ModalProps>(null)
  const [triggerType, setTriggerType] = useState<ModalTriggerTypes | null>(null)
  const recaptchaRef = useRef<HTMLFormElement>()
  const {gtmNewsletterSubscriptionStartedEvent, gtmNewsletterSubscribedEvent} =
    useGtmNewsletterEvent()
  const onDirty = gtmNewsletterSubscriptionStartedEvent
  const onClose = () => {
    setIsOpen(false)
    setCustomModalProps(null)
    if (triggerType === ModalTriggerTypes.POPUP) {
      gtmPopupClickedEvent({
        cta_value: SIGN_UP,
        method: MethodTypes.CENTER,
        type: TypeTypes.FORM,
        link_url: CLOSE,
      })
    }
  }
  const newsletterFormProps = {
    title: customModalProps?.title || WANT_TO_KNOW_MORE,
    subtitle: customModalProps?.subtitle || JOIN_OUR_MAILING_LIST,
    successTitle: JOIN_OUR_MAILING_LIST_SUCCESS,
    successSubtitle: EXPECT_THE_LATEST_INFORMATION,
    isOpen,
    onClose,
    errorTitle: JOIN_OUR_MAILING_LIST_ERROR,
    onSubmit: async (data: any) => {
      gtmNewsletterSubscribedEvent(data)
      const observer = captchaInitObserver()
      await recaptchaRef?.current?.executeAsync()
      removeCaptchaObserver(observer)
      const response = await sendSubscribeRequest(data, window.location.href)
      if (!response.isSuccess)
        GTMErrorMessageEvent({
          error_message: response.error.message,
          type: ErrorType.FORM,
        })
      return response
    },
    onDirty,
    disableBackdrop,
    recaptchaRef,
    recaptchaNode: <RecaptchaNode recaptchaRef={recaptchaRef} />,
    image: customModalProps?.image ? customModalProps.image : null,
    primaryCTA: customModalProps?.primaryCTA ? customModalProps.primaryCTA : null,
  }

  const openNewsletterModal = (modalProps: ModalProps, triggerType: ModalTriggerTypes) => {
    setIsOpen(true)
    if (modalProps) {
      setCustomModalProps(modalProps)
    }
    setTriggerType(triggerType)
  }

  return {
    newsletterFormProps,
    openNewsletterModal,
  }
}
