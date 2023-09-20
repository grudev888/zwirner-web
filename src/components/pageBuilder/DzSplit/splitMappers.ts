import {MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

import {EXHIBITION, EXHIBITIONS_URL, LEARN_MORE} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {mapExhibitionStatus} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {builder} from '@/sanity/imageBuilder'
import {DzSplitTypeProps} from '@/sanity/types'

export const dzSplitOverrides = (props: DzSplitTypeProps) => {
  const {imageOverride, enableOverrides} = props
  if (!enableOverrides) return {}
  const {asset, alt, url} = imageOverride ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const media = imgSrc
    ? {
        media: {
          url,
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
      }
    : {}
  return {
    data: {
      ...media,
    },
  }
}

export const splitMappers: any = {
  artist: (data: any) => {
    const {splitType, reverse, animate, birthdate, picture, fullName, description, summary} = data
    const {asset, alt} = picture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''

    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        category: 'Category Slug',
        title: fullName,
        subtitle: birthdate,
        secondaryTitle: summary,
        secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
        description,
      },
    }
  },
  artwork: (data: any) => {
    const {
      splitType,
      reverse,
      animate,
      photos,
      artists,
      availability,
      dimensions,
      edition,
      medium,
      title,
      dateSelection,
    } = data
    const [mainArtist] = artists ?? []
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        category: availability,
        title,
        subtitle: dateSelection?.year,
        secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
        secondarySubtitle: `${mainArtist?.fullName}`,
        description: `${dimensions} ${edition} ${medium}`,
      },
    }
  },
  exhibitionPage: (data: any, props: DzSplitTypeProps) => {
    const {artists, title, summary, locations, slug, heroMedia, subtitle} = data ?? {}
    const [primaryArtist] = artists ?? []
    const {fullName} = primaryArtist ?? {}
    const {media} = dzMediaMapper({
      data: heroMedia ?? data,
      ImgElement: Image,
    })
    const {splitType, reverse, animate} = props ?? {}
    const {current} = slug ?? {}
    const ctas = ctaMapper({data: props, props: {url: current ?? EXHIBITIONS_URL}})

    const summaryText = safeText({key: 'description', text: summary})

    let ctasSplit = {}
    if (ctas.primaryCTA) {
      ctasSplit = {
        buttonCTA: {...ctas.primaryCTA},
      }
    }
    if (ctas.linkCTA) {
      ctasSplit = {
        linkCTA: {...ctas.linkCTA},
      }
    }
    if (!ctas.linkCTA || !ctas.primaryCTA) {
      ctasSplit = {
        linkCTA: {
          text: LEARN_MORE,
          linkElement: Link,
          url: current ?? EXHIBITIONS_URL,
        },
      }
    }

    const {status} = mapExhibitionStatus(data)
    const [primaryLocation] = locations ?? []
    const {name} = primaryLocation ?? {}

    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media,
        category: EXHIBITION,
        title: title ?? fullName,
        ...(summaryText ?? {}),
        subtitle,
        secondaryTitle: name,
        secondarySubtitle: status,
        ...ctasSplit,
      },
    }
  },
}
