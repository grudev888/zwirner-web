import {CARD_TYPES, CardSizes} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export const artworkMapper = (data: any) => {
  const {title} = data ?? {}

  return {
    title: title,
  }
}

export const photosGrid = (data: any) => {
  const {photos = []} = data ?? {}
  return photos.map((photo: any) => {
    const {_key} = photo ?? {}
    const {media, extras} = dzMediaMapper({data, ImgElement: Image})
    const {caption} = extras ?? {}
    return {
      type: CARD_TYPES.MEDIA,
      id: _key,
      size: CardSizes['12col'],
      media,
      description: caption ?? '',
    }
  })
}
