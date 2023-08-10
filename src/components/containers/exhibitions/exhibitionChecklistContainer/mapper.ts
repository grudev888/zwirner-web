import {DzComplexGridProps, DzMediaProps} from '@zwirner/design-system'
import Image from 'next/image'

import {FILLER_FR} from '@/common/utilsMappers/components/elements'
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

export const mapCardsGrid = ({data, options = {}, imageOptions = {}}: ComplexGridMapperProps) => {
  const {displayNumberOfResults, items, itemsPerRow} = data ?? {}
  const cards = cardMapperForDzCard({data: items, imageOptions})

  return {
    cards,
    displayNumberOfResults,
    useLink: true,
    steps: [
      {
        id: 1,
        numberOfColumns: itemsPerRow,
        icon: FILLER_FR,
      },
    ],
    ...options,
  }
}
