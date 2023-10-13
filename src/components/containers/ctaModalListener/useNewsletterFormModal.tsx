import {FORM_MODAL_TYPES, useDzFormModal} from '@zwirner/design-system'
import React, {useRef} from 'react'

import {
  EXPECT_THE_LATEST_INFORMATION,
  JOIN_OUR_MAILING_LIST,
  JOIN_OUR_MAILING_LIST_ERROR,
  JOIN_OUR_MAILING_LIST_SUCCESS,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import RecaptchaNode from '@/components/forms/recaptchaNode'
import {sendSubscribeRequest} from '@/services/subscribeService'

export const useNewsletterFormModal = (disableBackdrop = false) => {
  const recaptchaRef = useRef<HTMLFormElement>()
  const {FormModal, openClickHandler} = useDzFormModal({
    formType: FORM_MODAL_TYPES.NEWSLETTER,
    title: WANT_TO_KNOW_MORE,
    subtitle: JOIN_OUR_MAILING_LIST,
    successTitle: JOIN_OUR_MAILING_LIST_SUCCESS,
    successSubtitle: EXPECT_THE_LATEST_INFORMATION,
    errorTitle: JOIN_OUR_MAILING_LIST_ERROR,
    onSubmit: async (data: any) => {
      await recaptchaRef?.current?.executeAsync()
      return sendSubscribeRequest(data, window.location.href)
    },
    disableBackdrop,
    recaptchaNode: <RecaptchaNode recaptchaRef={recaptchaRef} />,
  })

  return {
    NewsletterFormModal: FormModal,
    openClickHandler,
  }
}
