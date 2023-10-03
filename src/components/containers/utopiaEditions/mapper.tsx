import {MEDIA_TYPES, MEDIA_VIDEO_SOURCE_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import {dzMediaMapper, validateImage} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {builder} from '@/sanity/imageBuilder'

// TODO UNIFY MAIN MEDIA ON UTOPIA EDITIONS
export const utopiaMainMediaMap = (data: any) => {
  const {image, type, url} = data ?? {}
  const isVideo = type === 'video'
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const imageProps = {
    ImgElement: Image,
    imgProps: {src: imgSrc, alt, fill: true},
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

export const heroMap = (data: any) => {
  const exhibitions = data?.exhibitions
  const [principalExhibition] = exhibitions ?? []
  const {heroMedia} = principalExhibition ?? {}
  const [principalArtwork] = principalExhibition?.artworks ?? []

  const title = principalExhibition?.artists?.[0]?.fullName
  const {title: artworkTitle, dateSelection} = principalArtwork || {}
  const year = dateSelection?.year
  const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
  const {media} = dzMediaMapper({data: heroMediaSource ?? principalExhibition, ImgElement: Image})

  return {
    items: [
      {
        media,
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
    ?.filter((artwork) => validateImage(artwork))
    ?.map((artwork) => {
      const {artists, dimensions, title, dateSelection, medium, edition, _id, price, slug} =
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

      const {media} = dzMediaMapper({data: artwork, ImgElement: Image})
      const dimensionText = safeText({key: 'dimensions', text: dimensions})

      return {
        id: _id,
        media,
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium,
        ...(dimensionText ?? {}),
        edition,
        price,
        framed,
        slug: slug?.current,
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
