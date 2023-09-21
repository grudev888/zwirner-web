import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export const heroMapper = (data: any) => {
  const {heroMedia} = data ?? {}
  const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
  const {media} = dzMediaMapper({data: heroMediaSource ?? data, ImgElement: Image})
  return {
    media,
    title: '',
  }
}
