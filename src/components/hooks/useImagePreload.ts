import {useEffect} from 'react'

/*
This hook is used to preload images using JS
When it should be used:
1. We do not want to preload image with <link> in <head> as it will not be shown
immediately on a page (and will slow down page load).
2. We want image to appear immediately when block with it will be shown.
Ideal example - popups with images. No need in initial load, will be shown in
1-2 seconds, should be in-place immediately.
Attention: If you intend to use the preloaded image with the Next.js Image component,
set the `unoptimized` prop to true to prevent additional optimization, ensuring the image is in-place immediately when rendered.
*/
export const useImagePreload = (src: string | undefined) => {
  useEffect(() => {
    if (!src) return
    const image = new Image()
    image.src = src
  }, [src])
}
