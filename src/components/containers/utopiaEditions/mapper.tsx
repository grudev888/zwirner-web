import {
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_TYPES,
  MEDIA_VIDEO_SOURCE_TYPES,
} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

export const utopiaMainMediaMap = (data: any) => {
  const {image, type, url} = data ?? {}
  const isVideo = type === 'video'
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const imageProps = {
    imgProps: {
      url: '/',
      src: imgSrc,
      alt: alt,
    },
  }

  const videoProps = {
    videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,
    videoProps: {
      width: '100%',
      height: '100%',
      autoPlay: 'autoplay',
      muted: true,
      loop: true,
      controls: false,
    },
    sourceSet: <source src={url} type="video/mp4" />,
  }

  const mediaProps = isVideo ? videoProps : imageProps ?? {}

  return {
    type: isVideo ? MEDIA_TYPES.VIDEO : MEDIA_TYPES.IMAGE,
    ...mediaProps,
  }
}

export const interstitialNewReleasesMap = (data: any) => {
  const {title, cta} = data
  const {text} = cta ?? {}
  return {
    split: false,
    description: title,
    primaryCta: {
      text,
    },
    textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
  }
}
