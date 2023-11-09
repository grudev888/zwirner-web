import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCarousel,
  DzCarouselCardSize,
} from '@zwirner/design-system'

import {DzCard} from '@/components/wrappers/DzCardWrapper'
import {DzMedia} from '@/components/wrappers/DzMediaWrapper'

import {getHeaderVariant} from './utils'

export const ArticleHeader = ({data}: any) => {
  const {isSimpleMedia, isMediaCarousel, is1UpArtwork, isArtworkCarousel, isMixedCarousel, items} =
    getHeaderVariant(data)

  if (isSimpleMedia) {
    return <DzMedia {...items?.media} />
  }
  if (is1UpArtwork) {
    return (
      <DzCard
        key={items?.id}
        data={{
          ...items,
          size: CardSizes['12col'],
        }}
        type={CARD_TYPES.MEDIA}
      />
    )
  }
  const size = DzCarouselCardSize.XL
  if (isMediaCarousel || isArtworkCarousel || isMixedCarousel) {
    return (
      <DzCarousel size={size}>
        {items?.map((card: any) => {
          return (
            <DzCard
              key={card.id}
              data={{
                ...card,
                size: [CardSizes['10col'], carouselSizeToCardSize[size as DzCarouselCardSize]],
              }}
              type={CARD_TYPES.MEDIA}
            />
          )
        })}
      </DzCarousel>
    )
  }
  return null
}
