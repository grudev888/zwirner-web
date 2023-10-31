import {SUBSCRIBE_TYPE} from '@/common/constants/subscribe'
import {
  gtmNewsletterSubscribedEvent,
  gtmNewsletterSubscriptionStartedEvent,
  gtmNewsletterSubscriptionViewEvent,
} from '@/common/utils/gtm/gtmNewsletterSubscriptionEvent'
import useNewsletterStore from '@/store/newsletterStore'

const useGtmNewsletterEvent = () => {
  const method = useNewsletterStore((state) => state.method)
  const cta_value = useNewsletterStore((state) => state.cta_value)
  const setNewsletterState = useNewsletterStore((state) => state.setNewsletterState)
  return {
    gtmNewsletterSubscribedEvent: (data: any) => {
      const type: Array<string> = []
      if (data.access) type.push(SUBSCRIBE_TYPE.ACCESS)
      if (data.events) type.push(SUBSCRIBE_TYPE.EVENTS)
      if (data.news) type.push(SUBSCRIBE_TYPE.NEWS)
      gtmNewsletterSubscribedEvent(
        {method, cta_value, type: type.toString()},
        {event_form_hashemail: btoa(data?.email)}
      )
    },
    gtmNewsletterSubscriptionStartedEvent: () => {
      gtmNewsletterSubscriptionStartedEvent({
        method,
        cta_value,
        type: Object.values(SUBSCRIBE_TYPE).toString(),
      })
    },
    gtmNewsletterSubscriptionViewEvent: (eventObject: any) => {
      setNewsletterState(eventObject)
      gtmNewsletterSubscriptionViewEvent(eventObject)
    },
  }
}
export default useGtmNewsletterEvent
