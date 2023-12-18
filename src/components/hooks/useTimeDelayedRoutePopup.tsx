import {useRouter} from 'next/router'
import {useEffect, useRef} from 'react'

// delay in seconds
export const useTimeDelayedRoutePopup = (callback: () => void, delay?: number | null) => {
  const {asPath} = useRouter()
  const ref = useRef('/')

  // TODO clearPopup() programmatically on clientside redirect?

  useEffect(() => {
    if (!delay) return

    const pathWithoutHash = asPath.split('#')[0] ?? ''
    if (ref.current === pathWithoutHash) return

    const timeoutId = setTimeout(() => {
      callback()
      ref.current = pathWithoutHash
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [asPath, callback, delay])
}
