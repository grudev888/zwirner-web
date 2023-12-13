import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'

export const EVENT_TRIGGER_MODAL = 'triggerModal'
import {ModalTypes} from '@/sanity/types'

export enum ModalTriggerTypes {
  CTA = 'CTA',
  POPUP = 'POPUP',
}

type ModalTriggerEventProps = {
  modalType: ModalTypes
  props: any
  triggerType: ModalTriggerTypes
  popupInfo?: PopUpInfo
}

export const ModalTriggerEvent = ({
  modalType,
  props,
  triggerType,
  popupInfo,
}: ModalTriggerEventProps) => {
  return new CustomEvent(EVENT_TRIGGER_MODAL, {
    detail: {
      modalType,
      props,
      triggerType,
      popupInfo,
    },
  })
}
