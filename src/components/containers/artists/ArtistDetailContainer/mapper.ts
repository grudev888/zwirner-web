import {
  ButtonModes,
  CARD_TYPES,
  DzCarouselCardSize,
  MEDIA_ASPECT_RATIOS,
} from '@zwirner/design-system'
import parseISO from 'date-fns/parseISO'
import Image from 'next/image'
import Link from 'next/link'

import {LEARN_MORE} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {CtaActions, MediaTypes} from '@/sanity/types'

export const mapCarouselArtworks = (data: any, isSmall: boolean) => {
  if (!data?.title) return null

  return {
    title: data.title,
    size: data.size,
    items: data.items?.map((item: any) => {
      const {
        artists,
        dimensions,
        framedDimensions,
        title,
        dateSelection,
        medium,
        edition,
        _id,
        price,
        slug,
        artworkCTA,
      } = item ?? {}
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}

      const framed =
        typeof item.framed === 'boolean'
          ? item.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      const {media} = dzMediaMapper({data: item?.photos?.[0], ImgElement: Image})
      const dimensionText = safeText({
        key: 'dimensions',
        text: dimensions,
        customStyles: {normal: 'text-black-60 !text-sm'},
      })
      const framedDimensionsText = safeText({
        key: 'framedDimensions',
        text: framedDimensions,
        customStyles: {normal: 'text-black-60 !text-sm'},
      })
      const ctasOverrides = ctaMapper({
        data: {
          title: 'CTA',
          enableOverrides: true,
          primaryCTA:
            artworkCTA.CTA && artworkCTA.CTA !== CtaActions.NONE
              ? {
                  type: 'button',
                  action: artworkCTA?.CTA,
                  text: artworkCTA?.CTAText,
                  link: artworkCTA?.CTALink,
                }
              : undefined,
          secondaryCTA: artworkCTA
            ? {
                type: 'button',
                action: artworkCTA?.secondaryCTA,
                text: artworkCTA?.SecondaryCTAText,
                link: artworkCTA?.SecondaryCTALink,
              }
            : undefined,
        },
      })

      return {
        id: _id,
        media,
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium: medium,
        ...(dimensionText ?? {}),
        ...(framedDimensionsText ?? {}),
        edition: edition,
        price: price,
        slug: slug?.current,
        ...(!isSmall && (data.size === DzCarouselCardSize.L || data.size === DzCarouselCardSize.XL)
          ? ctasOverrides ?? {}
          : {}),
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
      const {header} = item ?? {}
      const {media, hideImage} = dzMediaMapper({
        data: header ?? item,
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
        item.displayDate ||
        (item.publishDate ? dateFormatter.format(parseISO(item.publishDate)) : null)

      return {
        id: item._id,
        ...(media && {
          media,
        }),
        hideImage,
        enableZoom: true,
        title: item.title,
        category: item.category,
        secondaryTitle: item.subtitle,
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
  const {media} = dzMediaMapper({data: data.biographyPicture, ImgElement: Image})

  return {
    media,
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
    const {media, hideMedia} = dzMediaMapper({data: data.photos?.[0], ImgElement: Image})
    const description = safeText({key: 'description', text: data.description})
    const date =
      data.dateSelection?.year ||
      data.dateSelection?.approximate ||
      (data.dateSelection?.dateRange.to &&
        new Date(data.dateSelection?.dateRange.to).getFullYear().toString())

    return {
      ...(!hideMedia && {
        media,
      }),
      category: data.artworkType?.toUpperCase(),
      title: data.title,
      secondarySubtitle: date,
      ...description,
      ...(data.slug?.current && {
        linkCTA: {
          text: 'Learn More',
          linkElement: Link,
          url: data.slug.current,
        },
      }),
    }
  } else if (data._type === 'article') {
    const {header} = data ?? {}

    const {type: headerImageType} = header?.[0] ?? {}
    const sourceImage = Object.values(MediaTypes).includes(headerImageType)
      ? header?.[0]
      : header?.[0]?.photos?.[0]

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const date =
      data.displayDate ||
      (data.publishDate ? dateFormatter.format(parseISO(data.publishDate)) : null)

    const {media, hideMedia} = dzMediaMapper({
      data: sourceImage ?? data,
      ImgElement: Image,
    })

    return {
      ...(!hideMedia && {
        media,
      }),
      category: data.category?.toUpperCase(),
      title: data.title,
      secondaryTitle: data.subtitle,
      secondarySubtitle: date,
      ...safeText({text: data.description, key: 'description'}),
      ...(data.slug?.current && {
        linkCTA: {
          text: LEARN_MORE,
          linkElement: Link,
          url: data.slug.current,
        },
      }),
    }
  } else if (data._type === 'exhibitionPage') {
    const {media} = dzMediaMapper({data, ImgElement: Image})
    const secondaryTitleText = safeText({key: 'secondaryTitle', text: data.summary})

    return {
      media,
      title: data.title,
      subtitle: data.location?.name,
      ...(secondaryTitleText ?? {}),
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
      const descriptionText = safeText({key: 'description', text: item?.summary})

      return {
        secondaryTitle: item?.location?.name,
        secondarySubtitle: formatExhibitionDate(item),
        ...(descriptionText ?? {}),
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
  const {header} = item ?? {}
  const {type: headerImageType} = header?.[0] ?? {}
  const sourceImage = Object.values(MediaTypes).includes(headerImageType)
    ? header?.[0]
    : header?.[0]?.photos?.[0]

  const {media} = dzMediaMapper({data: sourceImage, ImgElement: Image})

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  })

  const year =
    item.displayDate || (item.publishDate ? dateFormatter.format(parseISO(item.publishDate)) : null)

  return {
    id: item._id,
    cardType: CARD_TYPES.CONTENT,
    ...(noMedia === false &&
      media && {
        media,
      }),
    title: item.title,
    secondaryTitle: item.subtitle,
    ...safeText({key: 'description', text: item.description}),
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
