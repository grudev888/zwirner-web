import Image from 'next/image'

import {EXHIBITION, EXHIBITIONS_URL, LEARN_MORE} from '@/common/constants/commonCopies'
import {mapExhibitionStatus} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {cardContentArticle} from '@/components/pageBuilder/utils/commonMappers'
import {DzHeroSchemaProps, MediaTypes} from '@/sanity/types'
export const heroMapper = (data: any) => {
  return data
}
export const dzHeroOverrides = (props: DzHeroSchemaProps) => {
  const {
    headingOverride,
    subHeadingOverride,
    secondaryTitleOverride,
    descriptionOverride,
    imageOverride,
    enableOverrides,
  } = props
  if (!enableOverrides) return {}

  const {media, hideMedia} = dzMediaMapper({
    data: {image: imageOverride},
    ImgElement: Image,
  })

  const title = headingOverride ? {title: headingOverride} : {}
  const subtitle = subHeadingOverride ? {subtitle: subHeadingOverride} : {}
  const secondaryTitle = secondaryTitleOverride ? {secondaryTitle: secondaryTitleOverride} : {}
  const description = descriptionOverride ? {description: descriptionOverride} : {}
  const mediaProps = !hideMedia ? media : {}
  return {
    ...mediaProps,
    ...title,
    ...subtitle,
    ...secondaryTitle,
    ...description,
  }
}
export const contentTypesMapper: any = {
  article: (data: any, props: any) => {
    const cardProps = cardContentArticle({data, props})
    return cardProps
  },
  artist: (data: any) => {
    const {birthdate, fullName, deathDate, picture, summary, description} = data
    const {media} = dzMediaMapper({
      data: {image: picture},
      ImgElement: Image,
    })
    return {
      media,
      title: fullName,
      subtitle: `${birthdate} ${deathDate ? ` // ${deathDate}` : ''}`,
      secondaryTitle: summary,
      description,
    }
  },
  artwork: (data: any) => {
    const {availability, dimensions, edition, medium, title} = data
    const {media} = dzMediaMapper({
      data,
      ImgElement: Image,
    })

    return {
      media,
      category: availability,
      title,
      description: `${dimensions} ${edition} ${medium}`,
    }
  },
  exhibitionPage: (data: any) => {
    const {
      title,
      subtitle,
      artists,
      locations,
      summary,
      heroMedia,
      cardViewMedia,
      slug,
      videoOverride,
    } = data ?? {}
    const {videoReference} = videoOverride ?? {}
    const [primaryArtist] = artists ?? []
    const {fullName} = primaryArtist ?? {}
    const [primaryLocation] = locations ?? []
    const {name} = primaryLocation ?? {}
    const {current} = slug ?? {}
    const {status} = mapExhibitionStatus(data)
    const cardViewMediaSource = Object.keys(cardViewMedia ?? {}).length > 0 ? cardViewMedia : null
    const {media} = dzMediaMapper({
      override: cardViewMediaSource,
      data: videoReference
        ? {video: videoReference, type: MediaTypes.VIDEO_RECORD}
        : heroMedia ?? data,
      ImgElement: Image,
    })
    const descriptionText = safeText({key: 'description', text: summary})
    return {
      media,
      category: EXHIBITION,
      title: title ?? fullName,
      subtitle,
      secondaryTitle: name,
      secondarySubtitle: status,
      ...(descriptionText ?? {}),
      linkCTA: {
        text: LEARN_MORE,
        url: current ?? EXHIBITIONS_URL,
      },
    }
  },
}
