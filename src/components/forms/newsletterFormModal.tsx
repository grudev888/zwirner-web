import {FORM_MODAL_TYPES} from '@zwirner/design-system'
import {ComponentProps, Ref} from 'react'

import RecaptchaNode from '@/components/forms/recaptchaNode'

import {DzFormModal} from '../wrappers/DzFormModalWrapper'

export const NewsletterFormModal = (
  props: Omit<ComponentProps<typeof DzFormModal>, 'type'> & {recaptchaRef: Ref<any>}
) => {
  const {recaptchaRef, ...formModalProps} = props

  return (
    <DzFormModal
      {...formModalProps}
      type={FORM_MODAL_TYPES.NEWSLETTER}
      recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
    />
  )
}
