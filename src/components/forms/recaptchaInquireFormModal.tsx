import {DzFormModalProps} from '@zwirner/design-system'
import {Ref} from 'react'

import RecaptchaNode from '@/components/forms/recaptchaNode'

import {DzFormModal} from '../wrappers/DzFormModalWrapper'

export const RecaptchaInquireFormModal = (
  props: Omit<DzFormModalProps, 'LinkElement'> & {recaptchaRef: Ref<any>}
) => {
  const {recaptchaRef, ...formModalProps} = props

  return (
    <DzFormModal
      {...formModalProps}
      type="inquire"
      recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
    />
  )
}
