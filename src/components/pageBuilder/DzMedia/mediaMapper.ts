import {CARD_TYPES, CardSizes} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {DzMediaSchemaProps} from '@/sanity/types'

export const dzMediaOverrides = (props: DzMediaSchemaProps) => {
  const {media: mediaProps} = props ?? {}
  const {caption} = mediaProps ?? {}
  const {media} = dzMediaMapper({data: mediaProps, ImgElement: Image})
  const descriptionText = safeText({
    key: 'description',
    text: caption ?? '',
    customStyles: {normal: 'text-black-60 mt-2.5'},
  })

  return {
    data: {
      size: CardSizes['12col'],
      media,
      ...(descriptionText ?? {}),
    },
    type: CARD_TYPES.MEDIA,
  }
}

export const contentTypesMapper: any = {}
