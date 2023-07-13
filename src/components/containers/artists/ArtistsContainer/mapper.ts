import {ButtonModes, CARD_TYPES, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

import {builder} from '@/sanity/imageBuilder'

export const mapInterstitial = (data: any, variant: 'light' | 'dark') => {
  if (!data) return null

  return {
    split: false,
    title: data.title,
    description: data.description || data.subtitle,
    textColor: variant === 'dark' ? 'black-100' : 'white-100',
    primaryCta: {
      text: data.cta?.text,
      ctaProps: {mode: variant === 'dark' ? ButtonModes.DARK : ButtonModes.LIGHT},
    },
    ...(data.image?.asset && {
      media: {
        url: '/',
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: builder.image(data.image.asset).url(),
          alt: data.image?.alt,
        },
      },
    }),
  }
}

export const mapCarouselArtworks = (data: any) => {
  return {
    title: data.title,
    size: data.size,
    items: data.items?.map((item: any) => {
      const {photos, artists, dimensions, title, dateSelection, medium, edition, _id, price} =
        item ?? {}
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}
      const [mainPicture] = photos ?? []
      const {asset, alt} = mainPicture ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''
      const framed =
        typeof item.framed === 'boolean'
          ? item.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      return {
        id: _id,
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
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
        framed,
      }
    }),
  }
}

export const mapCarouselBooks = (data: any) => {
  return {
    title: data.title,
    size: data.size,
    items: data.items?.map((item: any) => {
      const imgSrc = item.photos?.[0]?.asset ? builder.image(item.photos[0].asset).url() : ''
      return {
        id: item._id,
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
          imgProps: {
            src: imgSrc,
            alt: item.photos?.[0]?.alt,
            fill: true,
          },
        },
        price: item.price,
        title: item.title,
      }
    }),
  }
}

export const mapCarouselArticles = (data: any) => {
  return {
    title: data.title,
    size: data.size,
    items: data.items?.map((item: any) => {
      const imgSrc = item.image?.image?.asset ? builder.image(item.image.image.asset).url() : ''

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        month: 'long',
        year: 'numeric',
      })

      return {
        id: item._id,
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
          imgProps: {
            src: imgSrc,
            alt: item.image?.image?.alt,
            fill: true,
          },
        },
        title: item.title,
        category: item.category,
        secondarySubtitle: dateFormatter.format(new Date()),
        linkCTA: {
          text: 'Learn More',
          url: item.externalURL,
        },
      }
    }),
  }
}

export const mapEditorial = (_data: any) => {
  return {}
}

export const mapSplit = (props: any) => {
  const imgSrc = props.image?.asset ? builder.image(props.image.asset).url() : ''
  return {
    media: {
      type: MEDIA_TYPES.IMAGE,
      ImgElement: Image,
      imgProps: {src: imgSrc, alt: props.image?.alt, fill: true},
    },
    title: props.title,
    description: props.text,
    linkCTA: {
      text: 'Learn More',
      linkElement: 'a',
      url: props.url,
    },
  }
}

export const mapExhibitions = (data: any) => {
  if (data.items?.length === 2)
    return {_type: 'grid', data: mapGrid({...data, itemsPerRow: 2}, 'exhibition')}
  return {_type: 'hero', data: mapHero(data)}
}

const formatExhibitionDate = (item: any): string => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    month: 'long',
    day: 'numeric',
  })

  const currentDate = new Date()
  const endDate = new Date(item.endDate)
  const startDate = new Date(item.startDate)

  let dateLabel = ''

  if (currentDate.getTime() <= endDate.getTime() && currentDate.getTime() >= startDate.getTime()) {
    dateLabel = 'Now Open'
  } else if (currentDate.getTime() < startDate.getTime()) {
    dateLabel = 'Upcoming'
  } else {
    dateLabel = 'Past'
  }

  return `${dateLabel}: ${dateFormatter.format(startDate)} — ${dateFormatter.format(
    endDate
  )}, ${endDate.getFullYear()}`
}

export const mapHero = (data: any) => {
  return (
    data.items?.map((item: any) => {
      const {title, subtitle, photos = []} = item ?? {}
      const imgSrc = photos?.[0]?.asset ? builder.image(photos[0].asset).url() : ''

      return {
        secondaryTitle: 'New York',
        secondarySubtitle: formatExhibitionDate(item),
        description: item.description,
        media: {
          ImgElement: Image,
          type: MEDIA_TYPES.IMAGE,
          imgProps: {fill: true, url: '/', src: imgSrc, alt: photos?.[0]?.alt},
        },
        title,
        subtitle,
        linkCTA: {text: 'Learn More', linkElement: Link, url: '#'},
      }
    }) ?? []
  )
}

export const mapArticlesCard = (item: any) => {
  const imgSrc = item.image?.image?.asset ? builder.image(item.image.image.asset).url() : ''

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  })

  const year = dateFormatter.format(new Date(item.date))

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    media: {
      type: 'image',
      imgProps: {
        src: imgSrc,
        alt: item.image?.image?.alt,
      },
    },
    title: item.title,
    subtitle: item.subtitle,
    secondarySubtitle: year,
    description: item.description,
    linkCTA: {text: 'Learn More', linkElement: Link, url: '#'},
  }
}

export const mapExhibitionCard = (item: any) => {
  const imgSrc = item.photos?.[0]?.asset ? builder.image(item.photos[0].asset).url() : ''

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    media: {
      type: 'image',
      imgProps: {
        src: imgSrc,
        alt: item.photos?.[0]?.alt,
      },
    },
    title: item.title,
    subtitle: item.subtitle,
    secondaryTitle: 'New York',
    secondarySubtitle: formatExhibitionDate(item),
    description: item.description,
    linkCTA: {text: 'Learn More', linkElement: Link, url: '#'},
  }
}

export const mapGrid = (data: any, type: 'exhibition' | 'article') => {
  const {title, itemsPerRow, items} = data ?? {}

  return {
    cards: items?.map((item: any) =>
      type === 'exhibition' ? mapExhibitionCard(item) : mapArticlesCard(item)
    ),
    maxItemsPerRow: itemsPerRow,
    displayNumberOfResults: false,
    headingTitle: title,
    useLink: true,
  }
}
