import {DzFormModal, DzFormModalProps} from '@zwirner/design-system'
import Link from 'next/link'
import {Ref} from 'react'

import RecaptchaNode from '@/components/forms/recaptchaNode'

export const RecaptchaInquireFormModal = (
  props: Omit<DzFormModalProps, 'LinkElement'> & {recaptchaRef: Ref<any>}
) => {
  const {recaptchaRef, ...formModalProps} = props

  return (
    <DzFormModal
      {...formModalProps}
      type="inquire"
      recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
      LinkElement={Link}
    />
  )
}
