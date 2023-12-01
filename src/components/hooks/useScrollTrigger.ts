import {useRouter} from 'next/router'
import {useEffect, useMemo, useRef, useState} from 'react'

/* NWEB-961: This hook is used to trigger a callback when the user scrolls to a certain percentage of the page.
It uses ResizeObserver to track the height of the body element (as some elements loaded dynamically on a page it changes couple of times).
It uses IntersectionObserver to trigger the callback when the user scrolls to a certain percentage of the page. To achieve this, we add
"scroll-observer-target" element in the end of page and calculate a margin to it (in px) based on full page height and scroll percentage.
Calculated value used in rootMargin property of the IntersectionObserver.
Example usage (<Layout/> component):
  const percent = 75
  const cb = useCallback(() => console.log('scroll'), [])
  useScrollTrigger(cb, percent)
*/

export const useScrollTrigger = (callback: () => void, percent: number) => {
  const router = useRouter()
  const [bodyHeight, setBodyHeight] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerMargin = useMemo(() => bodyHeight * ((100 - percent) / 100), [bodyHeight, percent])
  const [noScroll, setNoScroll] = useState(false)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) =>
      setBodyHeight((entry?.target as HTMLBodyElement).offsetHeight)
    )
    resizeObserver.observe(document.body)
  }, [])

  useEffect(() => {
    const handleRedirect = () => setNoScroll(true)
    const handleRedirectComplete = () => setNoScroll(false)
    router.events.on('routeChangeStart', handleRedirect)
    router.events.on('routeChangeComplete', handleRedirectComplete)
  }, [router.events])

  useEffect(() => {
    const triggerElement = document.getElementById('scroll-observer-target')
    if (!triggerElement || !containerMargin) return

    const observerOptions = {
      rootMargin: `0px 0px ${containerMargin}px 0px`,
      threshold: 1.0,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting)
      if (isIntersecting && !noScroll) {
        callback()
        observerRef.current?.disconnect()
      }
    }, observerOptions)

    observerRef.current.observe(triggerElement)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [callback, containerMargin, noScroll])
}
