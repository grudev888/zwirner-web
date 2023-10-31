import {FC, useEffect} from 'react'

import {GTMDownloadLinkEvent} from '@/common/utils/gtm/GTMDownloadLinkEvent'
import {GTMExitLinkEvent} from '@/common/utils/gtm/gtmExitLinkEvent'

const LinkClickListener: FC = ({}) => {
  useEffect(() => {
    const linkClickListener = (e: any) => {
      const srcElement = e.srcElement
      if (srcElement?.__sn?.tagName == 'a') {
        const fullHostName = `${window.location.protocol}//${window.location.hostname}`
        const href = srcElement.__sn.attributes.href
        const urlObject = new URL(href)
        const path = urlObject.pathname
        const identifier = srcElement.innerText
        if (
          !href.startsWith('/') &&
          !href.startsWith(fullHostName) &&
          !href.startsWith('#') &&
          !/\.pdf|\.doc|\.csv|\.dmp|\.zip/.test(path)
        ) {
          GTMExitLinkEvent(identifier, href)
        } else if (/\.pdf|\.doc|\.csv|\.dmp|\.zip/.test(path)) {
          const attrStr: string[] = path.split('.')
          const fileStr = attrStr[attrStr.length - 2]?.split('/') ?? []
          const filename = fileStr[fileStr.length - 1] ?? ''
          const fileExt = attrStr[attrStr.length - 1]?.split('?')[0] ?? ''
          GTMDownloadLinkEvent(identifier, filename, fileExt)
        }
      }
    }

    if (typeof window !== undefined) {
      window.addEventListener('click', linkClickListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.removeEventListener('click', linkClickListener)
      }
    }
  }, [])
  return <></>
}

export default LinkClickListener
