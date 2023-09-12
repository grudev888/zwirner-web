import {CARD_TYPES, MEDIA_TYPES, CardViewport} from '@zwirner/design-system'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {
  dateSelectionArtworkMapper,
  mapExhibitionStatus,
  mapSingleDateFormat,
} from '@/common/utilsMappers/date.mapper'
import {
  DzCardExtendedProps,
  ArticleCategories,
  PressVariation,
  ArticleTypes,
  BookVariation,
} from '@/sanity/types'
import Image from 'next/image'
import {safeText} from '@/common/utilsMappers/safe'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {
  EXHIBITION,
  ORDER_NOW,
  LISTEN_NOW,
  EXHIBITIONS_URL,
  READ_MORE,
} from '@/common/constants/commonCopies'
// TODO: extract utils to a general mapper for availability
import {parseAvailability} from '@/components/containers/home/utils'
import Link from 'next/link'

export const dzCardOverrides = (props: DzCardExtendedProps) => {
  const {imageOverride, enableOverrides} = props ?? {}
  if (!enableOverrides) return {}

  const {media, hideImage} = dzMediaMapper({
    data: {image: imageOverride},
    ImgElement: Image,
  })
  return {
    data: {
      media,
      hideImage,
    },
  }
}

export const contentTypesMapper: any = {
  article: (data: any, props: DzCardExtendedProps) => {
    const {
      category,
      title,
      image,
      header,
      description,
      location,
      subtitle,
      slug,
      externalURL,
      type,
      publishDate,
      primarySubtitle,
    } = data ?? {}
    const {current} = slug ?? {}
    const {
      primarySubtitle: primarySubtitleOverride,
      secondarySubtitle,
      secondaryTitle: secondaryTitleOverride,
      pressVariation,
      cardSize,
      additionalInformation,
    } = props ?? {}
    const {media, hideImage} = dzMediaMapper({
      data: type === ArticleTypes.INTERNAL ? image : header?.[0],
      ImgElement: Image,
    })
    const additionalInformationText = safeText({
      key: 'additionalInformation',
      text: additionalInformation,
    })
    const descriptionText = safeText({key: 'description', text: description})
    const URL = type === ArticleTypes.EXTERNAL ? externalURL : current ?? '/'
    const ctasOverrides = ctaMapper({
      data: props,
      props: {url: URL, hideSecondary: true, defaultLinkText: READ_MORE},
    })
    const date = mapSingleDateFormat(publishDate)
    let cardProps = {}
    switch (category) {
      case ArticleCategories.NEWS:
        {
          cardProps = {
            media,
            hideImage,
            category,
            title,
            subtitle: primarySubtitle,
            secondaryTitle: subtitle,
            secondarySubtitle,
            ...(ctasOverrides ?? {}),
            ...(descriptionText ?? {}),
            ...(additionalInformationText ?? {}),
          }
        }
        break
      case ArticleCategories.PRESS:
        {
          const isSelectedPress = pressVariation === PressVariation.SELECTED_PRESS
          const secondaryTitle = isSelectedPress ? secondaryTitleOverride : ''
          const subtitlePrimary = !isSelectedPress ? primarySubtitle ?? primarySubtitleOverride : ''

          cardProps = {
            media,
            hideImage: isSelectedPress || hideImage,
            ...(!isSelectedPress ? {category} : {}),
            title,
            secondaryTitle,
            subtitle: subtitlePrimary,
            secondarySubtitle: date,
            ...(ctasOverrides ?? {}),
            ...(!isSelectedPress ? descriptionText ?? {} : {}),
          }
        }
        break
      case ArticleCategories.EVENT:
        {
          const {name} = location ?? {}
          cardProps = {
            media,
            hideImage,
            category,
            subtitle: primarySubtitle,
            secondarySubtitle: date,
            secondaryTitle: name,
            title,
            ...(descriptionText ?? {}),
            ...(ctasOverrides ?? {}),
          }
        }
        break
      default:
        {
          cardProps = {
            media,
            hideImage,
            title,
          }
        }
        break
    }

    return {
      type: CARD_TYPES.CONTENT,
      data: {
        size: cardSize,
        ...cardProps,
      },
    }
  },
  artist: (data: any, props: DzCardExtendedProps) => {
    const {picture, fullName} = data ?? {}
    const {cardSize} = props ?? {}
    const {media, hideImage} = dzMediaMapper({
      data: {image: picture},
      ImgElement: Image,
    })

    return {
      type: CARD_TYPES.CONTENT,
      data: {
        media,
        hideImage,
        title: fullName,
        size: cardSize,
      },
    }
  },
  book: (data: any, props: DzCardExtendedProps) => {
    const {title, subtitle, price, tagline, dateSelection, publisher, booksUrl} = data ?? {}

    const {media, hideImage} = dzMediaMapper({
      data,
      ImgElement: Image,
    })
    const {cardSize, bookVariation} = props ?? {}
    const ctasOverrides = ctaMapper({data: props})
    const {year} = dateSelectionArtworkMapper(dateSelection)
    const descriptionText = safeText({key: 'description', text: tagline})
    let ctasBook = {}
    if (!ctasOverrides.linkCTA || !ctasOverrides.primaryCTA) {
      ctasBook = {
        linkCTA: {
          text: ORDER_NOW,
          linkElement: Link,
          url: booksUrl,
        },
      }
    }

    const bookCardProps =
      bookVariation === BookVariation.PRODUCT
        ? {
            type: CARD_TYPES.ARTWORK,
            data: {
              size: cardSize,
              artistName: title,
              medium: year,
              media,
              hideImage,
              price,
              ...ctasBook,
            },
          }
        : {
            type: CARD_TYPES.CONTENT,
            data: {
              media,
              size: cardSize,
              category: publisher,
              title,
              subtitle,
              ...(descriptionText ?? {}),
              ...ctasBook,
            },
          }

    return bookCardProps
  },
  artwork: (data: any, props: DzCardExtendedProps) => {
    const {
      artists,
      dimensions,
      title,
      dateSelection,
      medium,
      edition,
      price,
      framed,
      framedDimensions,
    } = data ?? {}
    const {cardSize, additionalInformation} = props ?? {}
    const [mainArtist] = artists ?? []
    const ctasOverrides = ctaMapper({data: props})
    const {media} = dzMediaMapper({
      data,
      ImgElement: Image,
    })
    const additionalInformationText = safeText({
      key: 'additionalInformation',
      text: additionalInformation,
    })
    const dimensionText = safeText({key: 'dimensions', text: dimensions})
    const mediumText = safeText({key: 'medium', text: medium})
    const editionText = safeText({key: 'edition', text: edition})
    const {year} = dateSelectionArtworkMapper(dateSelection)
    const framedDimensionsText = safeText({key: 'framedDimensions', text: framedDimensions})
    return {
      type: CARD_TYPES.ARTWORK,
      data: {
        size: cardSize,
        media,
        artistName: mainArtist?.fullName,
        artworkTitle: title,
        artworkYear: year,
        price,
        framed,
        ...(mediumText ?? {}),
        ...(dimensionText ?? {}),
        ...(editionText ?? {}),
        ...(framedDimensionsText ?? {}),
        ...(additionalInformationText ?? {}),
        ...({...ctasOverrides} ?? {}),
      },
    }
  },
  exhibitionPage: (data: any, props: DzCardExtendedProps) => {
    const {cardSize, isOnGrid} = props ?? {}
    const {subtitle, title, heroMedia, locations, summary, slug, eyebrow} = data ?? {}
    const [primaryLocation] = locations ?? []
    const {name} = primaryLocation ?? {}
    const {current} = slug ?? {}
    const {media} = dzMediaMapper({
      data: heroMedia ?? data,
      ImgElement: Image,
    })
    const {status} = mapExhibitionStatus(data)
    const summaryText = safeText({key: 'description', text: summary})
    const ctasOverrides = ctaMapper({
      data: props,
      props: {url: current ?? EXHIBITIONS_URL, hideSecondary: true},
    })
    const cardLinkOnGrid = isOnGrid
      ? {
          cardLink: {
            href: current ?? EXHIBITIONS_URL,
          },
        }
      : {}
    return {
      type: CARD_TYPES.CONTENT,
      data: {
        media,
        size: cardSize,
        category: eyebrow ?? EXHIBITION,
        title: title,
        subtitle: subtitle,
        secondaryTitle: name,
        secondarySubtitle: status,
        enableZoom: true,
        ...cardLinkOnGrid,
        ...(summaryText ?? {}),
        ...(ctasOverrides ?? {}),
      },
    }
  },
  location: (data: any, props: DzCardExtendedProps) => {
    const {name, address, hours} = data ?? {}
    const {cardSize} = props ?? {}
    const {addressLine, state, city, zipCode} = address ?? {}
    const {media, hideImage} = dzMediaMapper({
      data,
      ImgElement: Image,
    })
    const currentTime = new Date()
    const availability = parseAvailability(hours, currentTime)?.some(
      (time: {from: Date; to: Date}) =>
        currentTime.getTime() <= time.to.getTime() && currentTime.getTime() >= time.from.getTime()
    )
    return {
      type: CARD_TYPES.CONTENT,
      data: {
        media,
        hideImage,
        title: name,
        secondaryTitle: (
          <>
            <span itemProp="streetAddress" property="streetAddress">
              {addressLine}
            </span>
            {'\n'}
            <span itemProp="addressRegion" property="addressRegion">
              {state}
            </span>
            ,{' '}
            <span itemProp="addressLocality" property="addressLocality">
              {city}
            </span>
            ,{' '}
            <span itemProp="postalCode" property="postalCode">
              {zipCode}
            </span>
          </>
        ),
        secondarySubtitle: availability ? 'Open' : 'Closed',

        size: cardSize,
      },
    }
  },
  podcast: (data: any, props: DzCardExtendedProps) => {
    const {title, subtitle, dateSelection, description, spotifyUrl} = data ?? {}
    const date = mapSingleDateFormat(dateSelection)
    const descriptionText = safeText({key: 'description', text: description})
    const {cardSize} = props ?? {}

    return {
      viewport: CardViewport.Desktop,
      type: CARD_TYPES.CONTENT,
      data: {
        media: {
          type: MEDIA_TYPES.PODCAST,
          url: spotifyUrl,
        },
        hideImage: !spotifyUrl,
        title,
        subtitle,
        secondarySubtitle: date,
        ...(descriptionText ?? {}),
        size: cardSize,
        ...(!!spotifyUrl && {
          linkCTA: {
            text: LISTEN_NOW,
            url: spotifyUrl,
            linkElement: Link,
            linkProps: {openNewTab: true},
          },
        }),
      },
    }
  },
}
