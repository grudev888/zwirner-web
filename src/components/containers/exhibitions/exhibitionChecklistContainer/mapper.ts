import {DzComplexGridProps, DzMediaProps} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

export interface ComplexGridMapperProps {
  data: any
  options?: Partial<DzComplexGridProps>
  imageOptions?: Partial<DzMediaProps>
}

export interface CardMapperForDzCard {
  data: any[]
  imageOptions?: Partial<DzMediaProps>
}

export const cardMapperForDzCard = ({data, imageOptions = {}}: CardMapperForDzCard) => {
  return data?.map((card) => {
    const {dimensions, title, medium, edition, _id, price} = card ?? {}
    const fullName = card?.artists?.at(0)?.fullName
    const year = card?.dateSelection?.year

    const framed =
      typeof card.framed === 'boolean' ? (card.framed === true ? 'Framed' : 'Unframed') : undefined

    const {media} = dzMediaMapper({
      data: card,
      ImgElement: Image,
      options: imageOptions,
    })
    const dimensionText = safeText({key: 'dimensions', text: dimensions})

    return {
      id: _id,
      media,
      artistName: fullName,
      artworkTitle: title,
      artworkYear: year,
      medium: medium,
      ...(dimensionText ?? {}),
      edition: edition,
      price: price,
      framed,
      primaryCTA: {
        text: 'Inquire',
        ctaProps: {
          // Todo inquire with _id
          onClick: () => null,
        },
      },
    }
  })
}
