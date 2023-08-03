import {DzInterstitialProps, DzMediaProps, MEDIA_OBJECT_FIT} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export interface InterstitialMapperProps {
  data: any
  options?: Partial<DzInterstitialProps>
  imageOptions?: Partial<DzMediaProps>
}

export const dzInterstitialMapper = ({
  data,
  options = {},
  imageOptions = {},
}: InterstitialMapperProps) => {
  const {title, subtitle, cta, mode} = data ?? {}
  const {text} = cta ?? {}
  const {media, hideMedia} = dzMediaMapper({
    data,
    ImgElement: Image,
    options: {objectFit: MEDIA_OBJECT_FIT.COVER, ...imageOptions},
  })

  console.log('hideMedia', hideMedia)

  return {
    data: {
      fullWidth: true,
      split: false,
      mode,
      title,
      description: subtitle,
      primaryCta: {
        text,
      },
      ...(!hideMedia ? {media} : {}),
      ...options,
    },
  }
}
