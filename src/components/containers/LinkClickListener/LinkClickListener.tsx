import {FC, useEffect} from 'react'

import {GTMDownloadLinkEvent} from '@/common/utils/gtm/GTMDownloadLinkEvent'
import {GTMExitLinkEvent} from '@/common/utils/gtm/gtmExitLinkEvent'

const LinkClickListener: FC = ({}) => {
  useEffect(() => {
    function linkClickListener(e: any) {
      let target = e.target
      if (target.tagName !== 'A' || target.tagName !== 'a') {
        const parentTarget = target.closest('a')
        if (!parentTarget) return
        target = parentTarget
      }
      const fullHostName = `${window.location.protocol}//${window.location.hostname}`
      const href = target.getAttribute('href')
      const identifier = target.innerText
      let path = ''
      if (/^\/|^#/.test(href)) path = href
      else {
        const url = new URL(href)
        path = url.pathname
      }
      if (!new RegExp(`^\/|^${fullHostName}|^#|\.pdf|\.doc|\.csv|\.dmp|\.zip`).test(href)) {
        GTMExitLinkEvent(identifier, href)
      }
      if (/\.pdf|\.doc|\.csv|\.dmp|\.zip/.test(path)) {
        const attrStr: string[] = path.split('.')
        const fileStr = attrStr[attrStr.length - 2]?.split('/') ?? []
        const filename = fileStr[fileStr.length - 1] ?? ''
        const fileExt = attrStr[attrStr.length - 1]?.split('?')[0] ?? ''
        GTMDownloadLinkEvent(identifier, filename, fileExt)
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
