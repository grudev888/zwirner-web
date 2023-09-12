import Image from 'next/image'
import {DzHeroSchemaProps} from '@/sanity/types'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {mapExhibitionStatus} from '@/common/utilsMappers/date.mapper'

import {EXHIBITION, LEARN_MORE, EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {safeText} from '@/common/utilsMappers/safe'
import Link from 'next/link'

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
    const {title, subtitle, artists, locations, summary, heroMedia, slug} = data ?? {}
    const [primaryArtist] = artists ?? []
    const {fullName} = primaryArtist ?? {}
    const [primaryLocation] = locations ?? []
    const {name} = primaryLocation ?? {}
    const {current} = slug ?? {}
    const {status} = mapExhibitionStatus(data)
    const {media} = dzMediaMapper({
      data: heroMedia ?? data,
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
        linkElement: Link,
        url: current ?? EXHIBITIONS_URL,
      },
    }
  },
}
