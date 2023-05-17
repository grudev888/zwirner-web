import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'
import {DzHeroSchemaProps} from '@/sanity/types'

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
  const {asset, alt, url} = imageOverride ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const title = headingOverride ? {title: headingOverride} : {}
  const subtitle = subHeadingOverride ? {subtitle: subHeadingOverride} : {}
  const secondaryTitle = secondaryTitleOverride ? {secondaryTitle: secondaryTitleOverride} : {}
  const description = descriptionOverride ? {description: descriptionOverride} : {}
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
    ...media,
    ...title,
    ...subtitle,
    ...secondaryTitle,
    ...description,
  }
}
export const contentTypesMapper: any = {
  artist: (data: any) => {
    const {birthdate, fullName, deathDate, picture, summary, description} = data
    const {asset, alt} = picture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      media: {
        url: '/',
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
        },
      },
      title: fullName,
      subtitle: `${birthdate} ${deathDate ? ` // ${deathDate}` : ''}`,
      secondaryTitle: summary,
      description,
    }
  },
  artwork: (data: any) => {
    const {photos, availability, dimensions, edition, medium, title} = data
    const [mainPicture] = photos
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
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
      description: `${dimensions} ${edition} ${medium}`,
    }
  },
  exhibition: (data: any) => {
    const {events, subtitle, title, summary, description, artworks} = data
    const [mainArtWork] = artworks ?? []

    const [event] = events ?? []
    const {photos} = event ?? mainArtWork ?? {}
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''

    return {
      media: {
        url: '/',
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
        },
      },
      title,
      subtitle,
      secondaryTitle: summary,
      description,
    }
  },
}
