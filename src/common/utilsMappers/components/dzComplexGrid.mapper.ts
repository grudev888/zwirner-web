import {CARD_TYPES, CardTypes, DzComplexGridProps, DzMediaProps} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

import {FILLER_FR} from './elements'

export interface ComplexGridMapperProps {
  data: any
  cardType: CardTypes
  options?: Partial<DzComplexGridProps>
  imageOptions?: Partial<DzMediaProps>
}

export interface ImageMapperForDzCard {
  data: any[]
  cardType: CardTypes
  imageOptions?: Partial<DzMediaProps>
}

export enum DzCardSources {
  Image = 'Image',
}

export const imageMapperForDzCard = ({
  data,
  cardType = CARD_TYPES.CONTENT,
  imageOptions = {},
}: ImageMapperForDzCard) => {
  return data?.map((img) => {
    const {_key} = img ?? {}
    const {media, hideMedia} = dzMediaMapper({
      data: img,
      ImgElement: Image,
      options: imageOptions,
    })

    return {
      cardType,
      id: _key,
      media,
      hideImage: hideMedia,
      description: '',
    }
  })
}

const cardMapperPerDataType = {
  [DzCardSources.Image]: imageMapperForDzCard,
}

export const dzComplexGridMapper = ({
  data,
  cardType = CARD_TYPES.CONTENT,
  options = {},
  imageOptions = {},
}: ComplexGridMapperProps) => {
  const {displayNumberOfResults, items, itemsPerRow} = data ?? {}
  const cardMapper = cardMapperPerDataType[DzCardSources.Image]
  const cards = cardMapper({data: items, cardType, imageOptions})

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
