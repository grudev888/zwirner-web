import {
  GTMDownloadLinkText,
  GTMErrorMessageText,
  GTMExternalLinkText,
  GTMInquiryFormStartText,
  GTMInquiryFormSubmitText,
  GTMInquiryFormViewText,
  GTMPageLoadCompletedText,
  GTMPageLoadStartedText,
  GTMUserSubscriptionFormStartedText,
  GTMUserSubscriptionFormViewText,
  GTMUserSubscriptionText,
} from '@/common/constants/gtmConstants'

export const reset = function (this: any) {
  this.reset()
}

export const gtmEvent = (event: string, data: DataLayerProps) => {
  if (!data.event) {
    return
  }

  const defaultData = {
    event,
    detailed_event: data.detailed_event,
  }

  switch (data.event) {
    case GTMPageLoadStartedText.event:
      return window.dataLayer.push(
        {
          ...defaultData,
          page_data: data.page_data,
          user_data: data.user_data,
        },
        {
          event: GTMPageLoadCompletedText.event,
          detailed_event: GTMPageLoadCompletedText.detailed_event,
        },
        reset
      )
    case GTMExternalLinkText.event:
    case GTMDownloadLinkText.event:
    case GTMInquiryFormViewText.event:
    case GTMInquiryFormStartText.event:
    case GTMUserSubscriptionFormViewText.event:
    case GTMUserSubscriptionFormStartedText.event:
    case GTMErrorMessageText.event:
      return window.dataLayer.push(
        {
          ...defaultData,
          event_data: data.event_data,
        },
        reset
      )
    case GTMInquiryFormSubmitText.event:
    case GTMUserSubscriptionText.event:
      return window.dataLayer.push(
        {
          ...defaultData,
          event_data: data.event_data,
          user_data: data.user_data,
        },
        reset
      )
    default:
      return window.dataLayer.push(defaultData, reset)
  }
}
