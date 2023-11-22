import {FORM_MODAL_TYPES, useDzFormModal} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'
import {useRef} from 'react'

import {
  EXPECT_THE_LATEST_INFORMATION,
  JOIN_OUR_MAILING_LIST,
  JOIN_OUR_MAILING_LIST_ERROR,
  JOIN_OUR_MAILING_LIST_SUCCESS,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import {captchaInitObserver, removeCaptchaObserver} from '@/common/utils/recaptcha/observer'
import RecaptchaNode from '@/components/forms/recaptchaNode'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {sendSubscribeRequest} from '@/services/subscribeService'

type Props = {
  disableBackdrop?: boolean
  title?: string
  subtitle?: string
  successTitle?: string
  successSubtitle?: string
  image?: {
    src: string
    alt: string
  }
}

export const useNewsletterFormModal = (props?: Props) => {
  const {
    disableBackdrop = false,
    title = WANT_TO_KNOW_MORE,
    subtitle = JOIN_OUR_MAILING_LIST,
    successTitle = JOIN_OUR_MAILING_LIST_SUCCESS,
    successSubtitle = EXPECT_THE_LATEST_INFORMATION,
    image,
  } = props ?? {}
  const recaptchaRef = useRef<HTMLFormElement>()
  const {gtmNewsletterSubscriptionStartedEvent, gtmNewsletterSubscribedEvent} =
    useGtmNewsletterEvent()
  const onDirty = gtmNewsletterSubscriptionStartedEvent
  const {FormModal, openClickHandler} = useDzFormModal({
    formType: FORM_MODAL_TYPES.NEWSLETTER,
    title,
    subtitle,
    successTitle,
    successSubtitle,
    image,
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
    recaptchaNode: <RecaptchaNode recaptchaRef={recaptchaRef} />,
    LinkElement: Link,
    ImgElement: Image,
  })

  return {
    NewsletterFormModal: FormModal,
    openClickHandler,
  }
}
