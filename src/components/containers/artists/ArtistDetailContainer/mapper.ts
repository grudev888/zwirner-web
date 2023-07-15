import {ButtonModes, CARD_TYPES, MEDIA_ASPECT_RATIOS, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

import {builder} from '@/sanity/imageBuilder'

export const mapInterstitial = (data: any, onCTAClick?: () => void) => {
  if (!data?.title) return null

  return {
    split: false,
    title: data.title,
    description: data.description || data.subtitle,
    mode: data.mode || 'Dark',
    primaryCta: {
      text: data.cta?.text,
      ctaProps: {onClick: onCTAClick},
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
    customClass: '-mx-5',
  }
}

export const mapCarouselArtworks = (data: any) => {
  if (!data?.title) return null

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
  if (!data?.title) return null
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
        artworkTitle: item.title,
      }
    }),
  }
}

export const mapCarouselArticles = (data: any, isSmall: boolean) => {
  if (!data?.title) return null
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

      const date =
        item.dateSelection?.approximate ||
        item.dateSelection?.year ||
        (item.date ? dateFormatter.format(new Date(item.date)) : null)

      return {
        id: item._id,
        ...(imgSrc && {
          media: {
            aspectRatio: isSmall ? MEDIA_ASPECT_RATIOS['4:3'] : MEDIA_ASPECT_RATIOS['16:9'],
            url: '/',
            type: MEDIA_TYPES.IMAGE,
            ImgElement: Image,
            imgProps: {
              src: imgSrc,
              alt: item.image?.image?.alt,
              fill: true,
            },
          },
        }),
        title: item.title,
        category: item.category,
        secondaryTitle: item.description,
        secondarySubtitle: date,
        ...(item.slug?.current && {
          linkCTA: {
            text: 'Learn more',
            url: item.slug.current,
            linkElement: Link,
          },
        }),
      }
    }),
  }
}

export const mapBiography = (data: any) => {
  if (!data) return null

  const imgSrc = data.biographyPicture?.asset
    ? builder.image(data.biographyPicture.asset).url()
    : ''

  return {
    media: {
      type: MEDIA_TYPES.IMAGE,
      imgProps: {src: imgSrc, alt: data.picture?.alt},
    },
    description: data.description,
  }
}

export const mapSplit = (data: any, onCTAClick?: () => void) => {
  if (!data?.title) return null

  const imgSrc = data.image?.asset ? builder.image(data.image.asset).url() : ''
  return {
    media: {
      type: MEDIA_TYPES.IMAGE,
      ImgElement: Image,
      imgProps: {src: imgSrc, alt: data.image?.alt, fill: true},
    },
    title: data.title,
    description: data.text,
    buttonCTA: {
      text: 'Explore Works',
      ctaProps: {
        mode: ButtonModes.DARK,
        onClick: onCTAClick,
      },
    },
  }
}

export const mapExhibitions = (data: any) => {
  if (!data) return null

  if (data.items?.length === 2)
    return {
      _type: 'grid',
      title: data.title,
      data: mapGrid({...data, itemsPerRow: 2}, 'exhibition'),
    }
  return {_type: 'hero', title: data.title, data: mapHero(data)}
}

const formatExhibitionDate = (item: any): string => {
  if (!item.startDate || !item.endDate) return ''

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
  if (!data) return null
  return (
    data.items?.map((item: any) => {
      const {title, subtitle, photos = []} = item ?? {}
      const imgSrc = photos?.[0]?.asset ? builder.image(photos[0].asset).url() : ''

      return {
        secondaryTitle: 'New York',
        secondarySubtitle: formatExhibitionDate(item),
        description: item.summary,
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

  const year = item.displayDate || item.dateSelection?.year || item.dateSelection?.approximate

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    ...(imgSrc && {
      media: {
        type: 'image',
        imgProps: {
          src: imgSrc,
          alt: item.image?.image?.alt,
        },
      },
    }),
    title: item.title,
    subtitle: item.subtitle,
    secondaryTitle: item.description,
    secondarySubtitle: year,
    ...(item.slug?.current && {
      linkCTA: {text: 'Learn More', linkElement: Link, url: item.slug.current},
    }),
  }
}

export const mapExhibitionCard = (item: any) => {
  const imgSrc = item.photos?.[0]?.asset ? builder.image(item.photos[0].asset).url() : ''

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    ...(imgSrc && {
      media: {
        type: 'image',
        imgProps: {
          src: imgSrc,
          alt: item.photos?.[0]?.alt,
        },
      },
    }),
    title: item.title,
    subtitle: item.subtitle,
    secondaryTitle: 'New York',
    secondarySubtitle: formatExhibitionDate(item),
    description: item.description,
    linkCTA: {text: 'Learn More', linkElement: Link, url: '#'},
  }
}

export const mapGrid = (data: any, type: 'exhibition' | 'article') => {
  if (!data?.title) return null
  const {title, itemsPerRow, items} = data ?? {}

  return {
    cards: items?.map((item: any) =>
      type === 'exhibition' ? mapExhibitionCard(item) : mapArticlesCard(item)
    ),
    maxItemsPerRow: itemsPerRow,
    title: title,
    useLink: true,
  }
}
