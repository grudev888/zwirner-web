import {InquireFormContextData, INQUIRY_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

// TODO replace this with unified mapper
export const mapCardsGrid = (
  data: any[],
  ctaClickHandler: (contextData: InquireFormContextData) => void
) => {
  return data?.map((artwork) => {
    const {dimensions, title, medium, edition, _id, price} = artwork ?? {}
    const fullName = artwork?.artists?.at(0)?.fullName
    const year = artwork?.dateSelection?.year
    const slug = artwork?.slug?.current
    const onClickCTA = (ctaText: string) => {
      ctaClickHandler({
        id: _id,
        title: artwork?.artists?.[0]?.fullName,
        artwork,
        ctaText,
        inquiryType: INQUIRY_TYPES.ARTIST,
      })
    }
    const framed =
      typeof artwork.framed === 'boolean'
        ? artwork.framed === true
          ? 'Framed'
          : 'Unframed'
        : undefined

    const {media} = dzMediaMapper({data: artwork?.photos?.[0], ImgElement: Image})
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
      slug,
      primaryCTA: {
        text: 'Inquire',
        ctaProps: {
          onClick: () => onClickCTA('Inquire'),
        },
      },
    }
  })
}
