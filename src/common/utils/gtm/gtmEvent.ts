import {GTMPageLoadCompletedText, GTMPageLoadStartedText} from '@/common/constants/gtmConstants'

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
    case GTMPageLoadStartedText.event.toString():
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
    default:
      return window.dataLayer.push(defaultData, reset)
  }
}
