import {useRouter} from 'next/router'
import {useEffect} from 'react'

// delay in seconds
export const useTimeDelayedRoutePopup = (callback: () => void, delay?: number | null) => {
  const {asPath} = useRouter()

  // TODO clearPopup() programmatically on clientside redirect?

  useEffect(() => {
    if (!delay) return
    const timeoutId = setTimeout(callback, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [asPath, callback, delay])
}
