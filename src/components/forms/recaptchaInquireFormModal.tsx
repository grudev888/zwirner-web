import {DzFormModalProps, FORM_MODAL_TYPES} from '@zwirner/design-system'
import {Ref} from 'react'

import RecaptchaNode from '@/components/forms/recaptchaNode'

import {DzFormModal} from '../wrappers/DzFormModalWrapper'

export const RecaptchaInquireFormModal = (
  props: Omit<DzFormModalProps, 'LinkElement' | 'type'> & {recaptchaRef: Ref<any>}
) => {
  const {recaptchaRef, ...formModalProps} = props

  return (
    <DzFormModal
      {...formModalProps}
      type={FORM_MODAL_TYPES.INQUIRE}
      recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
    />
  )
}
