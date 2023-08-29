import Image from 'next/image'

import {dzMediaMapper, validateImage} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

export const mapCardsGrid = (data: any[]) => {
  return data
    ?.filter((artwork) => validateImage(artwork))
    ?.map((artwork) => {
      const {dimensions, title, medium, edition, _id, price} = artwork ?? {}
      const fullName = artwork?.artists?.at(0)?.fullName
      const year = artwork?.dateSelection?.year
      const slug = artwork?.slug?.current

      const framed =
        typeof artwork.framed === 'boolean'
          ? artwork.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      const {media} = dzMediaMapper({data: artwork, ImgElement: Image})
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
            // Todo inquire with _id
            onClick: () => null,
          },
        },
      }
    })
}
