import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'
import {DzSplitTypeProps} from '@/sanity/schema/objects/page/components/molecules/dzSplit'

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
  exhibition: (data: any) => {
    const {splitType, reverse, animate, events, subtitle, title, summary, description} = data
    const [event] = events ?? []
    const {photos} = event ?? {}
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
        category: subtitle,
        title,
        subtitle: summary,
        description,
        secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
        secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
      },
    }
  },
}
