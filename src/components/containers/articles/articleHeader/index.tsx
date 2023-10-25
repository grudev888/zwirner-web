import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCard,
  DzCarousel,
  DzCarouselCardSize,
  DzMedia,
} from '@zwirner/design-system'

import {getHeaderVariant} from './utils'

export const ArticleHeader = ({data}: any) => {
  const {isSimpleImage, isImageCarousel, is1UpArtwork, isArtworkCarousel, isMixedCarousel, items} =
    getHeaderVariant(data)

  if (isSimpleImage) {
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
  if (isImageCarousel || isArtworkCarousel || isMixedCarousel) {
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
