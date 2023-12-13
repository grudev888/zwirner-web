import {SUBSCRIBE_METHOD} from '@/common/constants/subscribe'
import {ModalTriggerEvent, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'
import {ModalTypes} from '@/sanity/types'
import {setCookie} from '@/utils/cookies/setCookie'

export const openPopupCb = (data?: PopUpInfo) => {
  if (!data) return

  if (!data.displayAlways) {
    setCookie(`${data.campaignName}-${data.id}`, data, {}, data.daysToExpire)
  }

  if (data.type === 'newsletter') {
    const parsedData = {
      title: data.title,
      subtitle: data.description,
      image: data.image,
      cta_value: data.primaryCTA,
    }
    window.document.dispatchEvent(
      ModalTriggerEvent(ModalTypes.NEWSLETTER, parsedData, ModalTriggerTypes.POPUP)
    )
    return
  }
  if (data.type === 'customPromo') {
    const parsedData = {
      title: data.title,
      subtitle: data.description,
      image: data.image,
      linkText: data.primaryCTA?.text,
      url: data.primaryCTA?.link?.href,
      openNewTab: data.primaryCTA?.link?.blank,
    }
    window.document.dispatchEvent(
      ModalTriggerEvent(ModalTypes.PROMO, parsedData, ModalTriggerTypes.POPUP)
    )
    return
  }
}

export const openNewsletterHeader = () => {
  window.document.dispatchEvent(
    ModalTriggerEvent(ModalTypes.NEWSLETTER, {method: SUBSCRIBE_METHOD.NAV}, ModalTriggerTypes.CTA)
  )
}
export const openNewsletterFooter = () => {
  window.document.dispatchEvent(
    ModalTriggerEvent(
      ModalTypes.NEWSLETTER,
      {method: SUBSCRIBE_METHOD.FOOTER},
      ModalTriggerTypes.CTA
    )
  )
}
