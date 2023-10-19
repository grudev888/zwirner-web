import Image from 'next/image'
import Link from 'next/link'

import {EXHIBITION, EXHIBITIONS_URL, LEARN_MORE} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {mapExhibitionStatus, mapSingleDateFormat} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'
import {DzSplitTypeProps} from '@/sanity/types'
import {ArticleTypes, MediaTypes} from '@/sanity/types'

export const showSplitSection = (data: PageBuilderComponentsDataSchemaType) => {
  if (data?._type !== 'dzSplit') return false
  const {content, props} = data ?? {}
  const {titleOverride, subtitleOverride, enableOverrides} = props ?? {}
  const hasOverridesField = enableOverrides && (titleOverride || subtitleOverride)
  return hasOverridesField || !!content
}

export const dzSplitOverrides = (props: DzSplitTypeProps) => {
  const {
    media: mediaOverride,
    titleOverride,
    splitType,
    reverse,
    animate,
    subtitleOverride,
    enableOverrides,
  } = props
  const ctas = ctaMapper({data: props})
  if (!enableOverrides) return {}
  const {media} = dzMediaMapper({
    data: mediaOverride,
    ImgElement: Image,
  })

  let ctasSplit = {}
  if (ctas.primaryCTA) {
    ctasSplit = {
      buttonCTA: {...ctas.primaryCTA},
    }
  }

  return {
    type: splitType,
    reverse,
    animate,
    data: {
      media,
      title: titleOverride,
      description: subtitleOverride,
      ...ctasSplit,
    },
  }
}

export const splitMappers: any = {
  artist: (data: any) => {
    const {splitType, reverse, animate, birthdate, picture, fullName, description, summary} = data

    const {media} = dzMediaMapper({
      data: picture,
      ImgElement: Image,
    })

    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media,
        category: 'Artist',
        title: fullName,
        subtitle: birthdate,
        secondaryTitle: summary,
        description,
      },
    }
  },
  article: (data: any, props: any) => {
    const {splitType, reverse, animate, mediaOverride} = props ?? {}

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

    const {name} = location ?? {}

    const {current} = slug ?? {}
    const {type: headerImageType} = header?.[0] ?? {}
    const sourceImage = Object.values(MediaTypes).includes(headerImageType)
    const descriptionText = safeText({key: 'description', text: description})
    const articleUrl = type === ArticleTypes.EXTERNAL ? externalURL : current ?? '/'
    const {media} = dzMediaMapper({
      override: mediaOverride,
      data: type === ArticleTypes.INTERNAL ? sourceImage : image,
      ImgElement: Image,
    })
    const date = mapSingleDateFormat(publishDate)
    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media,
        category,
        title,
        subtitle: primarySubtitle,
        secondaryTitle: name ?? subtitle,
        secondarySubtitle: displayDate ?? date,
        linkCTA: {
          text: LEARN_MORE,
          linkElement: Link,
          url: articleUrl,
          openNewTab: false,
        },
        ...descriptionText,
      },
    }
  },
  artwork: (data: any) => {
    const {
      splitType,
      reverse,
      animate,
      artists,
      availability,
      dimensions,
      edition,
      medium,
      title,
      dateSelection,
    } = data
    const [mainArtist] = artists ?? []

    const {media} = dzMediaMapper({
      data,
      ImgElement: Image,
    })

    return {
      type: splitType,
      reverse,
      animate,
      data: {
        media,
        category: availability,
        title,
        subtitle: dateSelection?.year,
        secondarySubtitle: `${mainArtist?.fullName}`,
        description: `${dimensions} ${edition} ${medium}`,
      },
    }
  },
  exhibitionPage: (data: any, props: DzSplitTypeProps) => {
    const {artists, title, summary, locations, slug, heroMedia, subtitle} = data ?? {}
    const [primaryArtist] = artists ?? []
    const {fullName} = primaryArtist ?? {}
    const {splitType, reverse, animate, media: mediaOverride} = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null

    const {media} = dzMediaMapper({
      override: mediaOverrideSource?.type !== 'Unset' ? mediaOverride : null,
      data: heroMediaSource?.type !== 'Unset' ? heroMediaSource : data,
      ImgElement: Image,
    })

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
