import {ButtonModes, CARD_TYPES, MEDIA_ASPECT_RATIOS, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {builder} from '@/sanity/imageBuilder'

export const mapInterstitial = (data: any, onCTAClick?: () => void) => {
  if (!data?.title) return null

  const {media} = dzMediaMapper({data, ImgElement: Image})
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
      media,
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
      const {artists, dimensions, title, dateSelection, medium, edition, _id, price} = item ?? {}
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}

      const framed =
        typeof item.framed === 'boolean'
          ? item.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      const {media} = dzMediaMapper({data: item, ImgElement: Image})
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
      const {media} = dzMediaMapper({data: item, ImgElement: Image})

      return {
        id: item._id,
        media,
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
      const {media, hideImage} = dzMediaMapper({
        data: item,
        ImgElement: Image,
        options: {
          aspectRatio: isSmall ? MEDIA_ASPECT_RATIOS['4:3'] : MEDIA_ASPECT_RATIOS['16:9'],
        },
      })

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
        ...(media && {
          media,
        }),
        hideImage,
        enableZoom: true,
        title: item.title,
        category: item.category,
        secondaryTitle: item.description,
        secondarySubtitle: date,
        ...(item.slug?.current && {
          linkCTA: {text: 'Learn more', url: item.slug.current, linkElement: Link},
          cardLink: {href: item.slug.current, openNewTab: true, LinkElement: Link},
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
      ImgElement: Image,
      imgProps: {src: imgSrc, alt: data.picture?.alt, fill: true},
    },
    description: data.description,
  }
}

export const mapSplit = (data: any, onCTAClick?: () => void) => {
  if (!data?.title) return null

  const {media} = dzMediaMapper({data, ImgElement: Image})
  return {
    media,
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

export const mapFeatured = (data: any) => {
  if (!data?._type) return data

  if (data._type === 'artwork') {
    const imgSrc = data.photos?.[0]?.asset ? builder.image(data.photos[0].asset).url() : ''
    const date =
      data.dateSelection?.year ||
      data.dateSelection?.approximate ||
      (data.dateSelection?.dateRange.to &&
        new Date(data.dateSelection?.dateRange.to).getFullYear().toString())

    return {
      ...(imgSrc && {
        media: {
          type: 'image',
          imgProps: {
            src: imgSrc,
            alt: data.photos?.[0]?.alt,
          },
        },
      }),
      category: data.artworkType?.toUpperCase(),
      title: data.title,
      secondarySubtitle: date,
      description: data.dimensions || data.description,
      ...(data.slug?.current && {
        linkCTA: {
          text: 'Learn More',
          linkElement: Link,
          url: data.slug.current,
        },
      }),
    }
  } else if (data._type === 'article') {
    const imgSrc = data.image?.image?.asset ? builder.image(data.image.image.asset).url() : ''
    const date =
      data.displayDate ||
      data.dateSelection?.year ||
      data.dateSelection?.approximate ||
      (data.dateSelection?.dateRange.to &&
        new Date(data.dateSelection?.dateRange.to).getFullYear().toString())

    return {
      ...(imgSrc && {
        media: {
          type: 'image',
          imgProps: {
            src: imgSrc,
            alt: data.image?.image?.alt,
          },
        },
      }),
      category: data.category?.toUpperCase(),
      title: data.title,
      // subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
      secondaryTitle: data.subtitle,
      secondarySubtitle: date,
      description: data.description,
      ...(data.slug?.current && {
        linkCTA: {
          text: 'Learn More',
          linkElement: Link,
          url: data.slug.current,
        },
      }),
    }
  } else if (data._type === 'exhibitionPage') {
    const imgSrc = data.photos?.[0]?.asset ? builder.image(data.photos[0].asset).url() : ''

    return {
      ...(imgSrc && {
        media: {
          type: 'image',
          imgProps: {
            src: imgSrc,
            alt: data.photos?.[0]?.alt,
          },
        },
      }),
      title: data.title,
      subtitle: data.location?.name,
      secondaryTitle: data.summary,
      secondarySubtitle: formatExhibitionDate(data),
      description: data.description,
      ...(data.slug?.current && {
        linkCTA: {
          text: 'Learn More',
          linkElement: Link,
          url: data.slug.current,
        },
      }),
    }
  }
}

export const mapExhibitions = (data: any) => {
  if (!data) return null

  if (data.items?.length === 2)
    return {
      _type: 'grid',
      title: data.title,
      data: mapGrid({...data, itemsPerRow: 2}, 'exhibitionPage'),
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
      const {title, subtitle} = item ?? {}
      const {media} = dzMediaMapper({data: item, ImgElement: Image})

      return {
        secondaryTitle: item?.location?.name,
        secondarySubtitle: formatExhibitionDate(item),
        description: item?.summary,
        media,
        title,
        subtitle,
        ...(item.slug?.current && {
          linkCTA: {text: 'Learn More', linkElement: Link, url: item.slug.current},
          cardLink: {href: item.slug.current, openNewTab: true, LinkElement: Link},
        }),
      }
    }) ?? []
  )
}

export const mapArticlesCard = (item: any, noMedia = false) => {
  const {media} = dzMediaMapper({data: item, ImgElement: Image})

  const year = item.displayDate || item.dateSelection?.year || item.dateSelection?.approximate

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    ...(noMedia === false &&
      media && {
        media,
      }),
    title: item.title,
    subtitle: item.subtitle,
    secondaryTitle: item.description,
    secondarySubtitle: year,
    ...(item.slug?.current && {
      linkCTA: {text: 'Learn More', linkElement: Link, url: item.slug.current},
      cardLink: {href: item.slug.current, openNewTab: true, LinkElement: Link},
    }),
  }
}

export const mapExhibitionCard = (item: any) => {
  const {media} = dzMediaMapper({data: item, ImgElement: Image})

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    ...(media && {
      media,
    }),
    title: item?.title,
    subtitle: item?.subtitle,
    secondaryTitle: item?.location?.name,
    secondarySubtitle: formatExhibitionDate(item),
    description: item?.description,
    ...(item.slug?.current && {
      linkCTA: {text: 'Learn More', linkElement: Link, url: item.slug.current},
      cardLink: {href: item.slug.current, openNewTab: true, LinkElement: Link},
    }),
  }
}

export const mapGrid = (data: any, type: 'exhibitionPage' | 'article', noMedia = false) => {
  if (!data?.title) return null
  const {title, itemsPerRow, items} = data ?? {}

  return {
    cards: items?.map((item: any) =>
      type === 'exhibitionPage' ? mapExhibitionCard(item) : mapArticlesCard(item, noMedia)
    ),
    maxItemsPerRow: itemsPerRow,
    title: title,
    useLink: true,
  }
}
