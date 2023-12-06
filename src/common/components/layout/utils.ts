import {SUBSCRIBE_METHOD} from '@/common/constants/subscribe'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {PopUpInfo} from '@/sanity/services/popups/getAllCampaigns'
import {CtaActions} from '@/sanity/types'
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
      primaryCTA: data.primaryCTA,
    }
    window.document.dispatchEvent(CTAClickEvent(CtaActions.NEWSLETTER, parsedData))
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
    window.document.dispatchEvent(CTAClickEvent(CtaActions.PROMO, parsedData))
    return
  }
}

export const openNewsletterHeader = () => {
  window.document.dispatchEvent(
    CTAClickEvent(CtaActions.NEWSLETTER, {method: SUBSCRIBE_METHOD.NAV})
  )
}
export const openNewsletterFooter = () => {
  window.document.dispatchEvent(
    CTAClickEvent(CtaActions.NEWSLETTER, {method: SUBSCRIBE_METHOD.FOOTER})
  )
}
