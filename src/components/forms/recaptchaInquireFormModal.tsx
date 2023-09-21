import {DzFormModal, DzFormModalProps} from '@zwirner/design-system'
import {Ref} from 'react'

import RecaptchaNode from '@/components/forms/recaptchaNode'

export const RecaptchaInquireFormModal = (props: DzFormModalProps & {recaptchaRef: Ref<any>}) => {
  const {recaptchaRef, ...formModalProps} = props

  return (
    <DzFormModal
      {...formModalProps}
      type="inquire"
      recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
    />
  )
}
