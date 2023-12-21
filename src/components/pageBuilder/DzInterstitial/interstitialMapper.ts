import {ButtonModes, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {SIGN_UP} from '@/common/constants/commonCopies'
import {ctaMapperInterstitial} from '@/common/utilsMappers/cta.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {builder} from '@/sanity/imageBuilder'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'
import {DzInterstitialTypeProps} from '@/sanity/types'

export const showInterstitialSection = (data: PageBuilderComponentsDataSchemaType) => {
  if (data?._type !== 'dzInterstitial') return false
  const {props} = data ?? {}
  const {cta, title, subtitle, eyebrow} = props ?? {}
  const {text, action} = cta ?? {}
  const hasContentToShow = title || subtitle || eyebrow
  const hasCTAText = text && action
  return hasContentToShow || hasCTAText
}

export const dzInterstitialOverrides = (props: DzInterstitialTypeProps) => {
  if (!props) return null
  const {title, subtitle, eyebrow, mode, cta, image} = props ?? {}
  const {media, hideMedia} = dzMediaMapper({data: image, ImgElement: Image})
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
          text: SIGN_UP,
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
          text: SIGN_UP,
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
          text: SIGN_UP,
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
