import {
  EDITORIAL_TEXT_TYPES,
  EDITORIAL_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_OBJECT_FIT,
  MEDIA_TYPES,
  SPLIT_TYPES,
} from '@zwirner/design-system'
import {Fragment} from 'react'

import {builder} from '@/sanity/imageBuilder'

import {formSectionMap} from '../consignments/mapper'

export const heroMapper = (data: any) => {
  const {image, heading, cta, category} = data ?? {}
  const {link, text} = cta ?? {}
  const {href, blank} = link ?? {}

  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    media: {
      url: '/',
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt,
      },
    },
    linkCTA: {
      text,
      linkElement: 'a',
      url: href ?? '/',
      linkProps: {
        openNewTab: blank,
        href: href,
        children: null,
      },
    },
    category,
    title: heading,
  }
}

export const exhibitionCarouselMapper = (data: any[]) => {
  return data
    ?.filter((exhibition) => {
      const {photos = []} = exhibition ?? {}
      const [mainImage] = photos ?? []
      const {asset} = mainImage ?? {}
      return !!asset
    })
    ?.map((exhibition) => {
      const {_id, title, subtitle, photos = [], summary} = exhibition ?? {}
      const [mainImage] = photos ?? []
      const {asset, alt} = mainImage ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      return {
        id: _id,
        media: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
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
      }
    })
}

export const artworksGridMap = (data: any) => {
  const cards = mapCardsGrid(data)
  return {
    cards,
    displayNumberOfResults: false,
    headingTitle: 'Featured Available Works',
    useLink: true,
    linkCTA: {
      text: 'View all',
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
      type: EDITORIAL_TYPES.COMPLEX,
    },
    form,
  }
}

export const utopiaFeatureMap = (data: any) => {
  const {image, text, title, url} = data ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    type: SPLIT_TYPES.SHORT,
    reverse: true,
    data: {
      media: {
        url,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
        },
      },
      title,
      description: text,
      linkCTA: {
        text: 'Learn More',
        linkElement: 'a',
        url,
      },
    },
  }
}

export const platformInterstitialMap = (data: any) => {
  const {title, subtitle, cta, image} = data ?? {}
  const {text} = cta ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    data: {
      split: false,
      title: title,
      description: subtitle,
      primaryCta: {
        text,
      },
      media: {
        url: '/',
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
        },
        imgClass: 'max-h-[30rem] object-cover md:object-cover',
        objectFit: MEDIA_OBJECT_FIT.COVER,
      },
    },
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
