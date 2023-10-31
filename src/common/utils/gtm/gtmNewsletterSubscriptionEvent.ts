import {
  GTMUserSubscriptionFormStartedText,
  GTMUserSubscriptionFormViewText,
  GTMUserSubscriptionText,
} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export const gtmNewsletterSubscriptionViewEvent = (event_data: DataLayerEventDataProps) => {
  gtmEvent(GTMUserSubscriptionFormViewText.event, {
    ...GTMUserSubscriptionFormViewText,
    event_data,
  })
}

export const gtmNewsletterSubscribedEvent = (
  event_data: DataLayerEventDataProps,
  user_data: DataLayerUserDataProps
) => {
  gtmEvent(GTMUserSubscriptionText.event, {
    ...GTMUserSubscriptionText,
    event_data,
    user_data,
  })
}

export const gtmNewsletterSubscriptionStartedEvent = (event_data: DataLayerEventDataProps) => {
  gtmEvent(GTMUserSubscriptionFormStartedText.event, {
    ...GTMUserSubscriptionFormStartedText,
    event_data,
  })
}
