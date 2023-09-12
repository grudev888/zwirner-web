import {MEDIA_TYPES, ButtonModes} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'
import {DzInterstitialTypeProps} from '@/sanity/types'
import {ctaMapperInterstitial} from '@/common/utilsMappers/cta.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import Image from 'next/image'
import {safeText} from '@/common/utilsMappers/safe'

export const interstitialMapper = (data: any) => {
  return data
}

export const dzInterstitialOverrides = (props: DzInterstitialTypeProps) => {
  const {title, subtitle, eyebrow, mode, cta} = props ?? {}
  const {media, hideMedia} = dzMediaMapper({data: props, ImgElement: Image})
  const ctasOverrides = ctaMapperInterstitial({data: cta, props: {url: ''}})
  const categoryText = safeText({key: 'category', text: eyebrow})
  return {
    data: {
      split: false,
      title,
      description: subtitle,
      ...(categoryText ?? {}),
      mode: mode || ButtonModes.DARK,
      ...(hideMedia ? {} : {media}),
      ...(ctasOverrides ?? {}),
      customClass: '-mx-5',
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
