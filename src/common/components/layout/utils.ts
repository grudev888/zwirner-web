import {SUBSCRIBE_METHOD} from '@/common/constants/subscribe'
import {ModalTriggerEvent, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'
import {ModalTypes} from '@/sanity/types'

export const openPopupCb = (data?: PopUpInfo) => {
  if (!data) return

  if (data.type === 'newsletter') {
    const parsedData = {
      title: data.title,
      subtitle: data.description,
      image: data.image,
      cta_value: data.primaryCTA,
    }
    window.document.dispatchEvent(
      ModalTriggerEvent({
        modalType: ModalTypes.NEWSLETTER,
        props: parsedData,
        triggerType: ModalTriggerTypes.POPUP,
        popupInfo: data,
      })
    )
    return
  }
  if (data.type === 'customPromo') {
    const href = data.primaryCTA?.link?.href
    const parsedData = {
      title: data.title,
      subtitle: data.description,
      image: data.image,
      linkText: data.primaryCTA?.text,
      url: `${href}${href?.includes('?') ? '&' : '?'}cta=${data.campaignId}`,
      openNewTab: data.primaryCTA?.link?.blank,
    }
    window.document.dispatchEvent(
      ModalTriggerEvent({
        modalType: ModalTypes.PROMO,
        props: parsedData,
        triggerType: ModalTriggerTypes.POPUP,
        popupInfo: data,
      })
    )
    return
  }
}

export const openNewsletterHeader = () => {
  window.document.dispatchEvent(
    ModalTriggerEvent({
      modalType: ModalTypes.NEWSLETTER,
      props: {method: SUBSCRIBE_METHOD.NAV},
      triggerType: ModalTriggerTypes.CTA,
    })
  )
}
export const openNewsletterFooter = () => {
  window.document.dispatchEvent(
    ModalTriggerEvent({
      modalType: ModalTypes.NEWSLETTER,
      props: {method: SUBSCRIBE_METHOD.FOOTER},
      triggerType: ModalTriggerTypes.CTA,
    })
  )
}
