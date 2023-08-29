import {
  ButtonModes,
  EDITORIAL_TEXT_TYPES,
  EditorialType,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_OBJECT_FIT,
  SPLIT_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import {LEARN_MORE, VIEW_ALL_TITLE} from '@/common/constants/commonCopies'
import {dzMediaMapper, validateImage} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

import {formSectionMap} from '../consignments/mapper'

export const heroMapper = (data: any) => {
  const [hero] = data ?? []
  const {title, slug, title: titleExhibition, _type} = hero ?? {}

  const category = _type === 'exhibitionPage' ? 'Exhibition' : 'Viewing room'
  const exhibitionURL = `${slug?.current ?? ''}`
  const {media} = dzMediaMapper({data: hero, url: exhibitionURL, ImgElement: Image})
  return {
    media,
    linkCTA: {
      text: 'Explore now',
      linkElement: 'a',
      url: exhibitionURL,
      linkProps: {
        openNewTab: false,
        href: exhibitionURL,
        children: null,
      },
    },
    category,
    title: title ?? titleExhibition,
  }
}

export const exhibitionCarouselMapper = (data: any[]) => {
  return data
    ?.filter((exhibitionPage) => validateImage(exhibitionPage))
    ?.map((exhibitionPage) => {
      const {_id, title, subtitle, summary} = exhibitionPage ?? {}
      const {media} = dzMediaMapper({data: exhibitionPage, ImgElement: Image})

      return {
        id: _id,
        media,
        category: subtitle,
        title,
        description: summary,
        linkCTA: {
          text: 'Explore Now',
          linkElement: 'a',
          url: '/',
        },
      }
    })
}

export const mapCardsGrid = (data: any[]) => {
  return data
    ?.filter((artwork) => validateImage(artwork))
    ?.map((artwork) => {
      const {artists, dimensions, title, dateSelection, medium, edition, _id, price} = artwork ?? {}
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
        medium: medium,
        ...(dimensionText ?? {}),
        edition: edition,
        price: price,
        slug: artwork?.slug?.current,
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

export const artworksGridMap = (data: any) => {
  const cards = mapCardsGrid(data)
  return {
    cards,
    displayNumberOfResults: false,
    useLink: true,
    linkCTA: {
      text: VIEW_ALL_TITLE,
      linkElement: 'a',
      url: '/',
    },
    steps: [
      {
        id: 1,
        numberOfColumns: 2,
        icon: <Fragment />,
      },
    ],
  }
}

export const consignmentsMap = (data: any) => {
  const {content, title, consignments} = data ?? {}
  const form = formSectionMap(consignments)
  return {
    editorial: {
      data: {
        reverse: false,
        paragraphs: [
          {
            type: EDITORIAL_TEXT_TYPES.QUOTE,
            text: title,
          },
          {
            type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
            text: content,
          },
        ],
      },
      type: EditorialType.COMPLEX,
    },
    form,
  }
}

export const utopiaFeatureMap = (data: any) => {
  const {text, title, url} = data ?? {}

  const {media} = dzMediaMapper({data, url, ImgElement: Image})

  return {
    type: SPLIT_TYPES.SHORT,
    reverse: true,
    data: {
      media,
      title,
      description: text,
      linkCTA: {
        text: LEARN_MORE,
        linkElement: 'a',
        url,
      },
    },
  }
}

export const platformInterstitialMap = (data: any) => {
  const {title, subtitle, cta} = data ?? {}
  const {text} = cta ?? {}

  const {media} = dzMediaMapper({
    data,
    ImgElement: Image,
    options: {objectFit: MEDIA_OBJECT_FIT.COVER},
  })

  return {
    data: {
      fullWidth: true,
      split: false,
      title: title,
      description: subtitle,
      primaryCta: {
        text,
      },
      media,
    },
  }
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      fullWidth: true,
      split: false,
      title,
      primaryCta: {
        text,
        ctaProps: {
          mode: ButtonModes.DARK,
        },
      },
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}
