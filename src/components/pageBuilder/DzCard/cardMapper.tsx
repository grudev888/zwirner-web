import {CARD_TYPES, CardViewport, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

import {
  EXHIBITION,
  EXHIBITIONS_URL,
  LEARN_MORE,
  LISTEN_NOW,
  ORDER_NOW,
  READ_MORE,
  VIEW_MORE,
} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {
  dateSelectionArtworkMapper,
  mapExhibitionStatus,
  mapSingleDateFormat,
} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
// TODO: extract utils to a general mapper for availability
import {parseAvailability} from '@/components/containers/home/utils'
import {
  ArticleCategories,
  ArticleTypes,
  BookVariation,
  DzCardExtendedProps,
  PressVariation,
} from '@/sanity/types'

export const dzCardOverrides = (props: DzCardExtendedProps) => {
  const {mediaOverride, enableOverrides} = props ?? {}
  if (!enableOverrides) return {}

  const {media, hideImage} = dzMediaMapper({
    data: {image: mediaOverride},
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
      displayDate,
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
      mediaOverride,
    } = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const {media, hideImage} = dzMediaMapper({
      data: mediaOverrideSource ?? (type === ArticleTypes.INTERNAL ? header?.[0] : image),
      ImgElement: Image,
    })
    const additionalInformationText = safeText({
      key: 'additionalInformation',
      text: additionalInformation,
    })
    const descriptionText = safeText({key: 'description', text: description})
    const articleUrl = type === ArticleTypes.EXTERNAL ? externalURL : current ?? '/'
    const ctasOverrides = ctaMapper({
      data: props,
      props: {url: articleUrl, hideSecondary: true, defaultLinkText: READ_MORE},
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
            cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
            ...(ctasOverrides ?? {}),
            ...(descriptionText ?? {}),
            ...(additionalInformationText ?? {}),
          }
        }
        break
      case ArticleCategories.PRESS:
        {
          const isSelectedPress = pressVariation === PressVariation.SELECTED_PRESS
          const secondaryTitle = isSelectedPress ? subtitle ?? secondaryTitleOverride : ''
          const subtitlePrimary = !isSelectedPress ? primarySubtitle ?? primarySubtitleOverride : ''

          cardProps = {
            media,
            hideImage: isSelectedPress || hideImage,
            ...(!isSelectedPress ? {category} : {}),
            title,
            secondaryTitle,
            subtitle: subtitlePrimary,
            secondarySubtitle: date,
            cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
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
            cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
            ...(descriptionText ?? {}),
            ...(ctasOverrides ?? {}),
          }
        }
        break
      case ArticleCategories.MUSEUM_EXHIBITION_PRESS:
      case ArticleCategories.MUSEUM_HIGHLIGHTS:
        {
          cardProps = {
            title,
            media,
            hideImage,
            category,
            subtitle: primarySubtitle ?? primarySubtitleOverride,
            ...(descriptionText ?? {}),
            cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
            linkCTA: {
              text: VIEW_MORE,
              url: articleUrl,
              linkElement: Link,
              linkProps: {openNewTab: true},
            },
          }
        }
        break
      case ArticleCategories.MUSEUM_EXHIBITION_RECORD:
        {
          const linkText = externalURL
            ? `${LEARN_MORE} at ${new URL(externalURL)?.host?.replace('www.', '')}`
            : VIEW_MORE
          cardProps = {
            title,
            media,
            hideImage,
            category,
            secondaryTitle: subtitle ?? secondaryTitleOverride,
            subtitle: primarySubtitle ?? primarySubtitleOverride,
            secondarySubtitle: displayDate ?? date,
            cardLink: {href: externalURL ?? current, openNewTab: true, LinkElement: Link},
            ...(descriptionText ?? {}),
            linkCTA: {
              text: linkText,
              url: externalURL ?? current,
              linkElement: Link,
              linkProps: {openNewTab: true},
            },
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
    const {cardSize, mediaOverride} = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const {media, hideImage} = dzMediaMapper({
      data: mediaOverrideSource ?? {image: picture},
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
    const {cardSize, bookVariation, mediaOverride} = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const {media, hideImage} = dzMediaMapper({
      data: mediaOverrideSource ?? data,
      ImgElement: Image,
    })
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
      slug,
      framedDimensions,
    } = data ?? {}

    const {cardSize, additionalInformation, mediaOverride} = props ?? {}

    const [mainArtist] = artists ?? []
    const {current} = slug ?? {}
    const ctasOverrides = ctaMapper({data: props, props: {url: current, hideSecondary: true}})

    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null

    const {media} = dzMediaMapper({
      data: mediaOverrideSource ?? data?.photos?.[0],
      url: current,
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
        ...(ctasOverrides ?? {}),
      },
    }
  },
  exhibitionPage: (data: any, props: DzCardExtendedProps) => {
    const {cardSize, isOnGrid, mediaOverride} = props ?? {}
    const {
      subtitle,
      title,
      heroMedia,
      locations,
      summary,
      slug,
      eyebrow,
      isDisabled = false,
    } = data ?? {}
    const [primaryLocation] = locations ?? []
    const {name} = primaryLocation ?? {}
    const {current} = slug ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
    const {media} = dzMediaMapper({
      data: mediaOverrideSource ?? heroMediaSource ?? data,
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
        isDisabled,
        size: cardSize,
        category: eyebrow ?? EXHIBITION,
        title: title,
        subtitle: subtitle,
        secondaryTitle: name,
        secondarySubtitle: status,
        enableZoom: true,
        cardLink: {
          href: current ?? EXHIBITIONS_URL,
        },
        ...cardLinkOnGrid,
        ...(summaryText ?? {}),
        ...(ctasOverrides ?? {}),
      },
    }
  },
  location: (data: any, props: DzCardExtendedProps) => {
    const {name, address, hours} = data ?? {}
    const {cardSize, mediaOverride} = props ?? {}
    const {addressLine, state, city, zipCode} = address ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const {media, hideImage} = dzMediaMapper({
      data: mediaOverrideSource ?? data,
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
    const {cardSize, mediaOverride} = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const {media} = dzMediaMapper({
      data: mediaOverrideSource,
      ImgElement: Image,
    })
    const mediaToRender = mediaOverrideSource
      ? media
      : {
          type: MEDIA_TYPES.PODCAST,
          url: spotifyUrl,
        }
    return {
      viewport: CardViewport.Desktop,
      type: CARD_TYPES.CONTENT,
      data: {
        media: mediaToRender,
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
