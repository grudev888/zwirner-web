import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'
import {DzInterstitialTypeProps} from '@/sanity/types'

export const interstitialMapper = (data: any) => {
  return data
}

export const dzInterstitialOverrides = (props: DzInterstitialTypeProps) => {
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

export const interstitialMap: any = {
  artist: (data: any) => {
    const {split, birthdate, fullName, picture, description} = data ?? {}
    const {asset, alt} = picture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      data: {
        split,
        category: birthdate,
        title: fullName,
        description,
        primaryCta: {
          text: 'Sign Up',
        },
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
      },
    }
  },
  artwork: (data: any) => {
    const {split = false, photos, availability, dimensions, edition, medium, title} = data ?? {}
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      data: {
        split,
        category: availability,
        title,
        description: `${medium} // ${dimensions} // ${edition}`,
        primaryCta: {
          text: 'Sign Up',
        },
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
      },
    }
  },
  exhibition: (data: any) => {
    const {split = false, events, title, summary, description} = data ?? {}
    const [event] = events ?? []
    const {photos} = event ?? {}
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      data: {
        split,
        category: summary,
        title,
        description,
        primaryCta: {
          text: 'Sign Up',
        },
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
      },
    }
  },
}
