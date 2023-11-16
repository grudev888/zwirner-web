import {CARD_TYPES, CardViewport, MEDIA_ASPECT_RATIOS, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {LISTEN_NOW, ORDER_NOW} from '@/common/constants/commonCopies'
import {
  gtmProductListingItemClickedEvent,
  gtmProductListingViewedEvent,
} from '@/common/utils/gtm/gtmProductEvent'
import {artworkCTAMapper, ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {dateSelectionArtworkMapper, mapSingleDateFormat} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
// TODO: extract utils to a general mapper for availability
import {parseAvailability} from '@/components/containers/home/utils'
import {createInquireModalArtworkProps} from '@/components/hooks/useOpenInquiryDispatch'
import {exhibitionCommonMapper} from '@/components/pageBuilder/utils/common'
import {cardContentArticle} from '@/components/pageBuilder/utils/commonMappers'
import {BookContentType} from '@/sanity/queries/components/content/bookContent'
import {BookVariation, DzCardExtendedProps} from '@/sanity/types'

const ARTWORK_CARD_TITLE_CHAR_LIMIT = 300

type ARTWORK_BG_COLOR_NAMES = 'transparent' | 'lightGrey' | 'darkGrey'

export const ARTWORK_BG_COLORS_TO_TW_VALUES = {
  transparent: '!bg-transparent',
  lightGrey: '!bg-[#f7f7f7]',
  darkGrey: '!bg-black-20',
}

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
    const {cardSize} = props ?? {}
    const cardProps = cardContentArticle({data, props})
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
  book: (data: BookContentType, props: DzCardExtendedProps) => {
    const {title, subtitle, price, tagline, dateSelection, publisher, booksUrl} = data ?? {}
    const {cardSize, bookVariation, mediaOverride} = props ?? {}
    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
      data: data,
      ImgElement: Image,
    })
    const {year} = dateSelectionArtworkMapper(dateSelection)
    const descriptionText = safeText({key: 'description', text: tagline})

    const ctaBook = booksUrl ? {linkCTA: {text: ORDER_NOW, url: booksUrl}} : {}

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
              ...ctaBook,
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
              ...ctaBook,
            },
          }

    return bookCardProps
  },
  artwork: (data: any, props: DzCardExtendedProps) => {
    const {
      artists,
      backgroundColor,
      dimensions,
      displayCustomTitle,
      displayTitle,
      title,
      dateSelection,
      medium,
      edition,
      price,
      framed,
      slug,
      framedDimensions,
      product,
    } = data ?? {}
    const imageBgColor = backgroundColor
      ? ARTWORK_BG_COLORS_TO_TW_VALUES[backgroundColor as ARTWORK_BG_COLOR_NAMES]
      : ''
    const {cardSize, additionalInformation, mediaOverride} = props ?? {}
    const [mainArtist] = artists ?? []
    const {fullName} = mainArtist ?? {}
    const {current} = slug ?? {}
    const {primaryCTA, secondaryCTA} = artworkCTAMapper(data, product)

    const ctasOverrides = ctaMapper({
      data: {...props, primaryCTA, secondaryCTA},
      props: {
        url: current,
        hideSecondary: false,
        ctaActionProps: createInquireModalArtworkProps(data),
      },
    })

    const {media} = dzMediaMapper({
      override: mediaOverride,
      data: data?.photos?.[0],
      url: current,
      ImgElement: Image,
    })
    const artworkTitle = (title || '')
      .slice(0, ARTWORK_CARD_TITLE_CHAR_LIMIT)
      .concat(title?.length > ARTWORK_CARD_TITLE_CHAR_LIMIT ? '...' : '')
    const displayTitleText = displayCustomTitle
      ? safeText({
          key: 'artworkTitle',
          text: displayTitle,
          charLimit: ARTWORK_CARD_TITLE_CHAR_LIMIT,
          customStyles: {normal: 'inline'},
          containerStyles: 'inline',
        })
      : null
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
        artworkTitle,
        ...(displayTitleText ?? {}),
        artworkYear: year,
        price,
        framed,
        slug: slug?.current,
        ...(mediumText ?? {}),
        ...(dimensionText ?? {}),
        ...(editionText ?? {}),
        ...(framedDimensionsText ?? {}),
        ...(additionalInformationText ?? {}),
        ...(ctasOverrides ?? {}),
      },
      onClickImage: () => {
        gtmProductListingItemClickedEvent(data)
      },
      onViewport: () => {
        gtmProductListingViewedEvent(data)
      },
      imageStyles: imageBgColor,
    }
  },
  exhibitionPage: (data: any, props: DzCardExtendedProps) => {
    return exhibitionCommonMapper({data, props})
  },
  onlineExhibitionPage: (data: any, props: DzCardExtendedProps) => {
    //TODO adjust mapper for onlineExhibitions when those are linked
    return exhibitionCommonMapper({data, props})
  },
  exceptionalWork: (data: any, props: DzCardExtendedProps) => {
    //TODO adjust mapper for exceptionalWork when those are linked
    return exhibitionCommonMapper({data, props})
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
      data: null,
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
            linkProps: {openNewTab: true},
          },
        }),
      },
    }
  },
  series: (data: any, props: DzCardExtendedProps) => {
    const {title, image, slug, displayDate} = data ?? {}
    const {cardSize, mediaOverride} = props ?? {}
    const {media, hideImage} = dzMediaMapper({
      override: mediaOverride,
      data: image,
      ImgElement: Image,
    })
    const {current} = slug ?? {}

    return {
      viewport: CardViewport.Desktop,
      type: CARD_TYPES.CONTENT,
      data: {
        media,
        hideImage,
        title: (
          <>
            <em>{title}</em> {displayDate ? `(${displayDate})` : ''}
          </>
        ),
        size: cardSize,
        cardLink: {
          href: current,
        },
      },
    }
  },
}
