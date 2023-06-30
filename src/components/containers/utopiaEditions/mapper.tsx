import {
  ButtonModes,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_TYPES,
  MEDIA_VIDEO_SOURCE_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import {builder} from '@/sanity/imageBuilder'

export const utopiaMainMediaMap = (data: any) => {
  const {image, type, url} = data ?? {}
  const isVideo = type === 'video'
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const imageProps = {
    imgProps: {
      url: '/',
      src: imgSrc,
      alt: alt,
    },
  }

  const videoProps = {
    videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,
    videoProps: {
      width: '100%',
      height: '100%',
      autoPlay: 'autoplay',
      muted: true,
      loop: true,
      controls: false,
    },
    sourceSet: <source src={url} type="video/mp4" />,
  }

  const mediaProps = isVideo ? videoProps : imageProps ?? {}

  return {
    type: isVideo ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMAGE,
    ...mediaProps,
  }
}

export const interstitialNewReleasesMap = (data: any) => ({
  split: false,
  description: data?.title,
  primaryCta: {text: data?.cta?.text, ctaProps: {mode: ButtonModes.DARK, className: 'mt-0'}},
  textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
})

export const heroMap = (data: any) => {
  const exhibitions = data?.exhibitions

  const title = exhibitions?.[0]?.exhibition?.artists?.[0]?.fullName

  const {title: artworkTitle, dateSelection} = exhibitions?.[0]?.exhibition?.artworks?.[0] || {}
  const year = dateSelection?.year

  const mainExhibitionPhoto = exhibitions?.[0]?.exhibition?.photos?.[0]
  const mainPicture = exhibitions?.[0]?.exhibition?.artworks?.[0]?.mainArtWork?.photos?.[0]

  const asset = mainExhibitionPhoto?.asset || mainPicture?.asset
  const alt = mainExhibitionPhoto?.alt || mainPicture?.alt

  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    items: [
      {
        media: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {src: imgSrc, alt, fill: true},
          ImgElement: Image,
        },
        title,
        description: (
          <>
            <i>{artworkTitle}</i>
            {`, ${year} (detail)`}
          </>
        ),
        linkCTA: {text: 'View More', linkElement: 'a', url: '/'},
      },
    ],
  }
}

export const mapCardsGrid = (data: any[]) => {
  return data
    ?.filter((artwork) => {
      const {photos} = artwork ?? {}
      const [mainPicture] = photos ?? []
      const {asset} = mainPicture ?? {}
      return !!asset
    })
    ?.map((artwork) => {
      const {photos, artists, dimensions, title, dateSelection, medium, edition, _id, price} =
        artwork ?? {}
      const framed =
        typeof artwork.framed === 'boolean'
          ? artwork.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}
      const [mainPicture] = photos ?? []
      const {asset, alt} = mainPicture ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      return {
        id: _id,
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {src: imgSrc, alt},
        },
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium,
        dimensions,
        edition,
        price,
        framed,
      }
    })
}

export const artworksGridMap = (data: any) => {
  const {Title, itemsPerRow, artworks} = data ?? {}
  const cards = mapCardsGrid(artworks)
  return {
    cards,
    displayNumberOfResults: false,
    headingTitle: Title,
    useLink: true,
    steps: [
      {
        id: 1,
        numberOfColumns: itemsPerRow,
        icon: <Fragment />,
      },
    ],
  }
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      split: false,
      title,
      primaryCta: {text, ctaProps: {mode: ButtonModes.DARK}},
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}
export const mapCarouselCards = (data: any[]) => {
  return data?.map((card: any) => {
    const {_key, caption, media} = card
    const mediaProps = utopiaMainMediaMap(media)
    return {
      id: _key,
      media: mediaProps,
      description: caption,
    }
  })
}
