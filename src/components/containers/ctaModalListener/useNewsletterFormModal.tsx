import {FORM_MODAL_TYPES, useDzFormModal} from '@zwirner/design-system'
import Link from 'next/link'
import React, {useRef} from 'react'

import {
  EXPECT_THE_LATEST_INFORMATION,
  JOIN_OUR_MAILING_LIST,
  JOIN_OUR_MAILING_LIST_ERROR,
  JOIN_OUR_MAILING_LIST_SUCCESS,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import RecaptchaNode from '@/components/forms/recaptchaNode'
import useGtmNewsletterEvent from '@/components/hooks/gtm/useGtmNewsletterEvent'
import {sendSubscribeRequest} from '@/services/subscribeService'

export const useNewsletterFormModal = (disableBackdrop = false) => {
  const recaptchaRef = useRef<HTMLFormElement>()
  const {gtmNewsletterSubscriptionStartedEvent, gtmNewsletterSubscribedEvent} =
    useGtmNewsletterEvent()
  const onDirty = gtmNewsletterSubscriptionStartedEvent
  const {FormModal, openClickHandler} = useDzFormModal({
    formType: FORM_MODAL_TYPES.NEWSLETTER,
    title: WANT_TO_KNOW_MORE,
    subtitle: JOIN_OUR_MAILING_LIST,
    successTitle: JOIN_OUR_MAILING_LIST_SUCCESS,
    successSubtitle: EXPECT_THE_LATEST_INFORMATION,
    errorTitle: JOIN_OUR_MAILING_LIST_ERROR,
    onSubmit: async (data: any) => {
      gtmNewsletterSubscribedEvent(data)
      await recaptchaRef?.current?.executeAsync()
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
  })

  return {
    NewsletterFormModal: FormModal,
    openClickHandler,
  }
}
