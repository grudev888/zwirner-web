import {
  ButtonModes,
  EDITORIAL_TEXT_TYPES,
  EDITORIAL_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_OBJECT_FIT,
  MEDIA_TYPES,
  SPLIT_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import {LEARN_MORE, VIEW_ALL_TITLE} from '@/common/constants/commonCopies'
import {builder} from '@/sanity/imageBuilder'

import {formSectionMap} from '../consignments/mapper'

export const heroMapper = (data: any) => {
  const [hero] = data ?? []
  const {exhibition, title, slug} = hero ?? {}
  const {photos, title: titleExhibition, _type} = exhibition ?? {}
  const [image] = photos ?? []

  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  const category = _type === 'exhibition' ? 'Exhibition' : 'Viewing room'
  const exhibitionURL = `/exhibitions/${slug?.current ?? ''}`
  return {
    media: {
      url: exhibitionURL,
      type: MEDIA_TYPES.IMAGE,
      ImgElement: Image,
      imgProps: {
        src: imgSrc,
        alt,
        fill: true,
      },
    },
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
          ImgElement: Image,
          imgProps: {
            src: imgSrc,
            alt,
            fill: true,
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
          ImgElement: Image,
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
            fill: true,
          },
        },
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium: medium,
        dimensions: dimensions,
        edition: edition,
        price: price,
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
        ImgElement: Image,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
      },
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
  const {title, subtitle, cta, image} = data ?? {}
  const {text} = cta ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    data: {
      fullWidth: true,
      split: false,
      title: title,
      description: subtitle,
      primaryCta: {
        text,
      },
      media: {
        ImgElement: Image,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
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
