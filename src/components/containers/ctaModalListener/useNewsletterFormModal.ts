import {FORM_MODAL_TYPES, useDzFormModal} from '@zwirner/design-system'

import {
  EXPECT_THE_LATEST_INFORMATION,
  JOIN_OUR_MAILING_LIST,
  JOIN_OUR_MAILING_LIST_ERROR,
  JOIN_OUR_MAILING_LIST_SUCCESS,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {sendSubscribeRequest} from '@/services/subscribeService'

export const useNewsletterFormModal = (disableBackdrop = false) => {
  const {FormModal, openClickHandler} = useDzFormModal({
    formType: FORM_MODAL_TYPES.NEWSLETTER,
    title: WANT_TO_KNOW_MORE,
    subtitle: JOIN_OUR_MAILING_LIST,
    successTitle: JOIN_OUR_MAILING_LIST_SUCCESS,
    successSubtitle: EXPECT_THE_LATEST_INFORMATION,
    errorTitle: JOIN_OUR_MAILING_LIST_ERROR,
    onSubmit: (data: any) => {
      console.info('TODO submit newsletter data: ', data)
      return sendSubscribeRequest()
    },
    disableBackdrop,
  })

  return {
    NewsletterFormModal: FormModal,
    openClickHandler,
  }
}
