import {CARD_TYPES, CardSizes} from '@zwirner/design-system'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {DzMediaSchemaProps} from '@/sanity/types'
import Image from 'next/image'
import {safeText} from '@/common/utilsMappers/safe'

export const dzMediaOverrides = (props: DzMediaSchemaProps) => {
  const {media: mediaProps, caption} = props ?? {}
  const {media} = dzMediaMapper({data: mediaProps, ImgElement: Image})
  const descriptionText = safeText({key: 'description', text: caption ?? ''})

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
