import {useEffect, useLayoutEffect, useState} from 'react'

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const NoSSR = ({children, defer, fallback}: any) => {
  const [isMounted, setMountedState] = useState(false)

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true)
  }, [defer])

  useEffect(() => {
    if (defer) setMountedState(true)
  }, [defer])

  return isMounted ? children : fallback
}

export default NoSSR
