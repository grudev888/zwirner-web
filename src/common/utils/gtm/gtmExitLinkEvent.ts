import {GTMExternalLinkText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export const GTMExitLinkEvent = (identifier: string, link_url: string) => {
  gtmEvent(GTMExternalLinkText.event, {
    ...GTMExternalLinkText,
    event_data: {identifier, link_url},
  })
}
