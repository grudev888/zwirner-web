import {GTMPopupViewText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export enum MethodTypes {
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
}

export enum TypeTypes {
  FORM = 'form',
  NON_FORM = 'non-form',
}

export const gtmPopupViewedEvent = (event_data: {
  cta_value: string
  method: MethodTypes
  type: TypeTypes
}) => {
  gtmEvent(GTMPopupViewText.event, {
    ...GTMPopupViewText,
    event_data,
  })
}
