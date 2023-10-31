import {GTMDownloadLinkText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export const GTMDownloadLinkEvent = (text: string, filename: string, fileExt: string) => {
  gtmEvent(GTMDownloadLinkText.event, {
    ...GTMDownloadLinkText,
    event_data: {file_extension: fileExt, file_name: filename, identifier: text},
  })
}
