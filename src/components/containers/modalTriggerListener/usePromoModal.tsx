import {ComponentProps, useState} from 'react'

import {CLOSE, EXPLORE} from '@/common/constants/commonCopies'
import {gtmPopupClickedEvent, TypeTypes} from '@/common/utils/gtm/gtmPopupEvent'
import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'
import {MethodTypes} from '@/events/ModalTriggerEvent'

export type PromoModalProps = Omit<ComponentProps<typeof DzPromoModal>, 'isOpen' | 'onClose'>

export const usePromoModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [promoModalProps, setPromoModalProps] = useState<PromoModalProps>()
  const onClose = () => {
    setIsOpen(false)
    gtmPopupClickedEvent({
      cta_value: promoModalProps?.linkText || EXPLORE,
      method: MethodTypes.CENTER,
      type: TypeTypes.NON_FORM,
      link_url: CLOSE,
    })
  }
  const onClickCTA = (url: string) => {
    gtmPopupClickedEvent({
      cta_value: promoModalProps?.linkText || EXPLORE,
      method: MethodTypes.CENTER,
      type: TypeTypes.NON_FORM,
      link_url: url,
    })
  }
  const openPromoModal = (modalProps: PromoModalProps) => {
    setPromoModalProps(modalProps)
    setIsOpen(true)
  }

  return {
    openPromoModal,
    promoModalProps: promoModalProps
      ? {...promoModalProps, isOpen, onClose, onClickCTA}
      : undefined,
  }
}
