import {CARD_TYPES, CardSizes} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {isImageZoomable} from '@/components/containers/artworks/artwork/index'
import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'
import {capitalizeFirstLetter} from '@/utils/string/capitalizeFirstLetter'

export const mapArtworkData = ({
  artists,
  artworkCTA,
  displayCustomTitle,
  displayTitle,
}: ArtworkDataType) => {
  const displayTitleText = displayCustomTitle
    ? safeText({
        key: 'displayTitle',
        text: displayTitle,
        customStyles: {normal: 'inline'},
        containerStyles: 'inline',
      })
    : {}

  return {
    artistName: artists?.[0]?.fullName,
    artistSlug: artists?.[0]?.artistPage?.slug?.current,
    primaryCta: artworkCTA?.CTA &&
      artworkCTA?.CTA !== 'none' && {
        text: artworkCTA.CTAText || capitalizeFirstLetter(artworkCTA?.CTA),
      },
    secondaryCta: artworkCTA?.secondaryCTA &&
      artworkCTA?.secondaryCTA !== 'none' && {
        text: artworkCTA.SecondaryCTAText || capitalizeFirstLetter(artworkCTA?.secondaryCTA),
      },
    displayTitle: displayTitleText?.portableTextDisplayTitle,
  }
}

export const photosGrid = ({photos}: ArtworkDataType) => {
  return photos?.map((photo) => {
    const {_key, image} = photo ?? {}
    const {media, extras} = dzMediaMapper({data: photo, ImgElement: Image})
    const {caption} = extras ?? {}
    return {
      type: CARD_TYPES.MEDIA,
      id: _key,
      size: CardSizes['12col'],
      media,
      description: caption ?? '',
      enableZoom: isImageZoomable(image?.metadata?.dimensions || {}),
    }
  })
}

export const getImageDimensions = ({photos}: ArtworkDataType) => {
  return photos?.reduce((dimensionsMap, photo) => {
    dimensionsMap[photo._key] = photo.image?.metadata?.dimensions
    return dimensionsMap
  }, {})
}
