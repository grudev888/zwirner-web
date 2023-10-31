import Image from 'next/image'

import {EXHIBITION, EXHIBITIONS_URL, LEARN_MORE} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {mapExhibitionStatus} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {cardContentArticle} from '@/components/pageBuilder/utils/commonMappers'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'
import {DzSplitTypeExtendedProps} from '@/sanity/types'

export const showSplitSection = (data: PageBuilderComponentsDataSchemaType) => {
  if (data?._type !== 'dzSplit') return false
  const {content, props} = data ?? {}
  const {titleOverride, subtitleOverride} = props ?? {}
  const hasOverridesField = titleOverride || subtitleOverride
  return hasOverridesField || !!content
}

export const dzSplitOverrides = (props: DzSplitTypeExtendedProps) => {
  const {media: mediaOverride, titleOverride, splitType, reverse, subtitleOverride, router} = props
  const ctas = ctaMapper({data: props, props: {linkAsButton: true, router}})

  const {media} = dzMediaMapper({
    override: mediaOverride,
    data: null,
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
    data: {
      ...(media?.imgProps?.src ? {media} : {}),
      title: titleOverride,
      description: subtitleOverride,
      ...ctasSplit,
    },
  }
}

export const splitMappers: any = {
  artist: (data: any) => {
    const {splitType, reverse, birthdate, picture, fullName, description, summary} = data

    const {media} = dzMediaMapper({
      data: picture,
      ImgElement: Image,
    })

    return {
      type: splitType,
      reverse,
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
    const cardProps = cardContentArticle({data, props})
    const {splitType, reverse} = props ?? {}

    return {
      type: splitType,
      reverse,
      data: cardProps,
    }
  },
  artwork: (data: any) => {
    const {
      splitType,
      reverse,
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

  exhibitionPage: (data: any, props: DzSplitTypeExtendedProps) => {
    const {artists, title, summary, locations, slug, heroMedia, cardViewMedia, subtitle} =
      data ?? {}
    const [primaryArtist] = artists ?? []
    const {fullName} = primaryArtist ?? {}
    const {splitType, reverse, media: mediaOverride} = props ?? {}
    const mediaOverrideSource = Object.keys(mediaOverride ?? {}).length > 0 ? mediaOverride : null
    const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
    const cardViewMediaSource = Object.keys(cardViewMedia ?? {}).length > 0 ? cardViewMedia : null
    const {media} = dzMediaMapper({
      override: mediaOverrideSource?.type !== 'Unset' ? mediaOverride : null,
      data: cardViewMediaSource ?? heroMediaSource?.type !== 'Unset' ? heroMediaSource : data,
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
