import {ComponentProps, useState} from 'react'

import {DzPromoModal} from '@/components/wrappers/DzPromoModalWrapper'

export type PromoModalProps = Omit<ComponentProps<typeof DzPromoModal>, 'isOpen' | 'onClose'>

export const usePromoModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [promoModalProps, setPromoModalProps] = useState<PromoModalProps>()
  const onClose = () => setIsOpen(false)
  const openPromoModal = (modalProps: PromoModalProps) => {
    setPromoModalProps(modalProps)
    setIsOpen(true)
  }

  return {
    openPromoModal,
    promoModalProps: promoModalProps ? {...promoModalProps, isOpen, onClose} : undefined,
  }
}
