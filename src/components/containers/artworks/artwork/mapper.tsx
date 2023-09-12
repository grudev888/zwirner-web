import {CARD_TYPES, CardSizes} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {ArtworkDataType} from '@/sanity/services/artworks/getArtworkData'
import {capitalizeFirstLetter} from '@/utils/string/capitalizeFirstLetter'

export const mapArtworkData = ({artists, artworkCTA}: ArtworkDataType) => {
  return {
    artistName: artists?.[0].fullName,
    artistSlug: artists?.[0].artistPage?.slug?.current,
    primaryCta: artworkCTA?.CTA &&
      artworkCTA?.CTA !== 'none' && {
        text: artworkCTA.CTAText || capitalizeFirstLetter(artworkCTA?.CTA),
      },
    secondaryCta: artworkCTA?.secondaryCTA &&
      artworkCTA?.secondaryCTA !== 'none' && {
        text: artworkCTA.SecondaryCTAText || capitalizeFirstLetter(artworkCTA?.secondaryCTA),
      },
  }
}

export const photosGrid = (data: ArtworkDataType) => {
  const {photos = []} = data ?? {}
  return photos.map((photo: any) => {
    const {_key} = photo ?? {}
    const {media, extras} = dzMediaMapper({data: photo, ImgElement: Image})
    const {caption} = extras ?? {}
    return {
      type: CARD_TYPES.MEDIA,
      id: _key,
      size: CardSizes['12col'],
      media,
      description: caption ?? '',
    }
  })
}
