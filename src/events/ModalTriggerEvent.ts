export const EVENT_TRIGGER_MODAL = 'triggerModal'
import {ModalTypes} from '@/sanity/types'

export enum ModalTriggerTypes {
  CTA = 'CTA',
  POPUP = 'POPUP',
}

export const ModalTriggerEvent = (
  modalType: ModalTypes,
  props: any,
  triggerType: ModalTriggerTypes
) => {
  return new CustomEvent(EVENT_TRIGGER_MODAL, {
    detail: {
      modalType,
      props,
      triggerType,
    },
  })
}
