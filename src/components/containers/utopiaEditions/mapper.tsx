import {
  CARD_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_TYPES,
  MEDIA_VIDEO_SOURCE_TYPES,
} from '@zwirner/design-system'
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
  primaryCta: {text: data?.cta?.text},
  textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
})

export const cardSectionMap = (data: any) => {
  const {title, exhibitions} = data ?? {}
  const [exhibitionData] = exhibitions ?? []
  const {exhibition} = exhibitionData ?? {}
  const {_id, artists, artworks, photos: exhibitionPhotos = []} = exhibition
  const [mainExhibitionPhoto] = exhibitionPhotos ?? []
  const [mainArtWork] = artworks ?? []
  const {title: artworkTitle, photos, dateSelection} = mainArtWork ?? {}
  const {year} = dateSelection ?? {}
  const [mainPicture] = photos ?? []
  const {asset, alt} = mainExhibitionPhoto ?? mainPicture ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  const [mainArtist] = artists ?? []
  const {fullName} = mainArtist ?? {}
  return {
    title,
    card: {
      data: {
        id: _id,
        media: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },

        title: fullName,
        secondaryTitle: (
          <>
            <i>{artworkTitle}</i>
            {`, ${year} (detail)`}
          </>
        ),

        linkCTA: {
          text: 'View More',
          linkElement: 'a',
          url: '/',
        },
      },
      type: CARD_TYPES.CONTENT,
    },
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
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium: medium,
        dimensions: dimensions,
        edition: edition,
        price: price,
        framed: 'Unframed',
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
      primaryCta: {
        text,
      },
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
