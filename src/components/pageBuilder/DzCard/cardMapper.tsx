import {CARD_TYPES, CardViewport, MEDIA_ASPECT_RATIOS, MEDIA_TYPES} from '@zwirner/design-system'
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
  MediaTypes,
} from '@/sanity/types'

export const dzCardOverrides = (props: DzCardExtendedProps) => {
  const {mediaOverride, enableOverrides, isSmall} = props ?? {}
  if (!enableOverrides) return {}

  const {media, hideImage} = dzMediaMapper({
    data: {image: mediaOverride},
    ImgElement: Image,
    options: {
      aspectRatio: isSmall ? MEDIA_ASPECT_RATIOS['4:3'] : MEDIA_ASPECT_RATIOS['16:9'],
    },
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
      cardSize,
      additionalInformation,
      mediaOverride,
      isSmall,
    } = props ?? {}

    const {type: headerImageType} = header?.[0] ?? {}
    const sourceImage = Object.values(MediaTypes).includes(headerImageType)
      ? header?.[0]
      : header?.[0]?.photos?.[0]

    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
      data: sourceImage ?? image,
      ImgElement: Image,
      options: {
        aspectRatio: isSmall ? MEDIA_ASPECT_RATIOS['4:3'] : MEDIA_ASPECT_RATIOS['16:9'],
      },
    })
    const additionalInformationText = safeText({
      key: 'additionalInformation',
      text: additionalInformation,
    })
    const descriptionText = safeText({key: 'description', text: description})
    const articleUrl = type === ArticleTypes.EXTERNAL ? externalURL : current ?? '/'
    // const ctasOverrides = ctaMapper({
    //   data: props,
    //   props: {url: articleUrl, hideSecondary: true, defaultLinkText: READ_MORE},
    // })
    const date = mapSingleDateFormat(publishDate)
    const linkText = externalURL
      ? `${LEARN_MORE} at ${new URL(externalURL)?.host?.replace('www.', '')}`
      : VIEW_MORE

    let cardProps = {}

    // RULES FOR ARTICLES

    const isSelectedPressVariant = type === ArticleTypes.PRESS
    const isPressArticle =
      (type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL) &&
      category === ArticleCategories.PRESS
    const isEventNews =
      (type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL) &&
      category === ArticleCategories.EVENT
    const isMuseumHighlight =
      (type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL) &&
      category === ArticleCategories.MUSEUM_HIGHLIGHTS
    const isMuseumExhibition =
      (type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL) &&
      category === ArticleCategories.MUSEUM_EXHIBITION

    const isNewsArticle = type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL

    if (isSelectedPressVariant) {
      cardProps = {
        media,
        // show only for certain pages
        hideImage: true,
        title,
        secondaryTitle: subtitle,
        secondarySubtitle: date,
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        linkCTA: {
          text: READ_MORE,
          linkElement: Link,
          url: articleUrl,
          openNewTab: false,
        },
      }
    } else if (isPressArticle) {
      cardProps = {
        media,
        hideImage: hideImage,
        category,
        title,
        secondaryTitle: subtitle ?? secondaryTitleOverride,
        subtitle: primarySubtitle ?? primarySubtitleOverride,
        linkCTA: {
          text: READ_MORE,
          linkElement: Link,
          url: articleUrl,
          openNewTab: false,
        },
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        ...(descriptionText ?? {}),
      }
    } else if (isEventNews) {
      const {name} = location ?? {}
      cardProps = {
        media,
        hideImage,
        category,
        subtitle: primarySubtitle,
        secondarySubtitle: displayDate ?? date,
        secondaryTitle: name,
        title,
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        linkCTA: {
          text: READ_MORE,
          linkElement: Link,
          url: articleUrl,
          openNewTab: false,
        },
        ...(descriptionText ?? {}),
      }
    } else if (isMuseumHighlight) {
      cardProps = {
        title,
        media,
        hideImage,
        category,
        subtitle: primarySubtitle ?? primarySubtitleOverride,
        secondaryTitle: subtitle ?? secondaryTitleOverride,
        secondarySubtitle: displayDate ?? date,
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        linkCTA: {
          text: linkText,
          url: articleUrl,
          linkElement: Link,
          linkProps: {openNewTab: true},
        },
      }
    } else if (isMuseumExhibition) {
      cardProps = {
        title,
        media,
        hideImage,
        category,
        subtitle: primarySubtitle ?? primarySubtitleOverride,
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        ...(descriptionText ?? {}),
        linkCTA: {
          text: linkText,
          url: articleUrl,
          linkElement: Link,
          linkProps: {openNewTab: true},
        },
      }
    } else if (isNewsArticle) {
      cardProps = {
        media,
        hideImage,
        category,
        title,
        subtitle: primarySubtitle,
        secondaryTitle: subtitle,
        secondarySubtitle,
        cardLink: {href: articleUrl, openNewTab: true, LinkElement: Link},
        linkCTA: {
          text: READ_MORE,
          linkElement: Link,
          url: articleUrl,
          openNewTab: false,
        },
        ...(descriptionText ?? {}),
        ...(additionalInformationText ?? {}),
      }
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
    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
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
    const {cardSize, bookVariation, mediaOverride} = props ?? {}
    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
      data: data,
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
      _id,
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
    const {fullName} = mainArtist ?? {}
    const {current} = slug ?? {}
    const ctasOverrides = ctaMapper({
      data: props,
      props: {
        url: current,
        hideSecondary: true,
        ctaActionProps: {
          id: _id,
          title: fullName,
          artwork: data,
        },
      },
    })

    const {media} = dzMediaMapper({
      override: mediaOverride,
      data: data?.photos?.[0],
      url: current,
      ImgElement: Image,
    })
    const additionalInformationText = safeText({
      key: 'additionalInformation',
      text: additionalInformation,
    })
    const dimensionText = safeText({
      key: 'dimensions',
      text: dimensions,
      customStyles: {normal: 'text-black-60 !text-sm'},
    })
    const mediumText = safeText({key: 'medium', text: medium})
    const editionText = safeText({key: 'edition', text: edition})
    const {year} = dateSelectionArtworkMapper(dateSelection)
    const framedDimensionsText = safeText({
      key: 'framedDimensions',
      text: framedDimensions,
      customStyles: {normal: 'text-black-60 !text-sm'},
    })
    return {
      type: CARD_TYPES.ARTWORK,
      data: {
        size: cardSize,
        media,
        artistName: fullName,
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
    const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
    const {media} = dzMediaMapper({
      override: mediaOverride,
      data: heroMediaSource ?? data,
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
    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
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
    const {cardSize, mediaOverride} = props ?? {}
    const {media} = dzMediaMapper({
      override: mediaOverride,
      data: {},
      ImgElement: Image,
    })
    const mediaToRender = media?.imgProps?.src
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
