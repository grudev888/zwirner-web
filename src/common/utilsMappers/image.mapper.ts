import {DzMediaProps, MEDIA_TYPES, MEDIA_VIDEO_SOURCE_TYPES} from '@zwirner/design-system'

import {SourceElement} from '@/common/utilsMappers/components/elements'
import {builder} from '@/sanity/imageBuilder'
import {videoBuilder} from '@/sanity/videoBuilder'

interface DzMediaImageMapper {
  data: any
  url?: string
  ImgElement: any
  options?: Partial<DzMediaProps>
  extraImgProps?: any
}

interface VideoSrcLinkProps {
  src: string
  extraVideoProps: any
}

interface DzMediaVideoMapper {
  data: any
  options?: Partial<DzMediaProps>
  extraVideoProps?: any
}

interface KeyOptions {
  imagesKey: 'photos' | 'heroMedia'
}

type DzMediaMapper = DzMediaImageMapper | DzMediaVideoMapper

export const validateImage = (data: any) => {
  if (data?.heroMedia) {
    return !!data.heroMedia?.image?.asset
  }

  const {photos} = data ?? {}
  const [mainPicture] = photos ?? []
  const {asset, image} = mainPicture ?? {}

  return image ? !!image.asset : !!asset
}

export const imageMapper = (data: any, keyOptions: KeyOptions) => {
  const {
    photos,
    heroMedia,
    image: sourceImage,
    asset: srcAsset,
    alt: altAsset,
    caption: captionAsset,
  } = data ?? {}
  let mainPicture: any = {}
  if (keyOptions?.imagesKey === 'photos') {
    mainPicture = (photos ?? [])[0]
  } else if (keyOptions?.imagesKey === 'heroMedia') {
    mainPicture = heroMedia
  }
  const {asset, alt, image, caption} = mainPicture ?? sourceImage ?? {}
  const {alt: imageBuilderAlt, asset: imageBuilderAsset, caption: imageBuilderCaption} = image ?? {}
  const pictureAsset = imageBuilderAsset ?? srcAsset ?? asset
  const imgCaption = imageBuilderCaption ?? captionAsset ?? caption
  const imgSrc = pictureAsset ? builder.image(pictureAsset).url() : ''
  const imgAlt = imageBuilderAlt ?? altAsset ?? alt

  return {
    alt: imgAlt,
    src: imgSrc,
    caption: imgCaption,
  }
}

const linksFromSource: any = {
  youtube: ({src, extraVideoProps = {}}: VideoSrcLinkProps) => {
    const urlObject = src ? new URL(src).searchParams : null
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
      videoProps: {
        source: {
          type: 'video',
          sources: [
            {
              src: urlObject ? urlObject.get('v') : '',
              provider: 'youtube',
            },
          ],
        },
        options: {
          enabled: true,
          autoplay: true,
          muted: true,
          resetOnEnd: true,
          clickToPlay: false,
          toggleInvert: false,
          loop: {active: true},
          vimeo: {
            loop: true,
            autoplay: true,
            muted: false,
          },
          ...extraVideoProps,
        },
      },
    }
  },
  vimeo: ({src, extraVideoProps = {}}: VideoSrcLinkProps) => {
    const urlObject = src ? new URL(src) : null
    const isEmbedded = urlObject ? ['player.vimeo.com'].includes(urlObject?.host) : false
    const isPublic = urlObject ? ['vimeo.com'].includes(urlObject?.host) : false
    const publicId = isPublic ? urlObject?.pathname?.replace(/\//, '') : ''

    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
      videoProps: {
        source: {
          type: 'video',
          sources: [
            {
              src: isEmbedded ? src : publicId,
              provider: 'vimeo',
            },
          ],
        },
        options: {
          enabled: true,
          autoplay: true,
          muted: true,
          resetOnEnd: true,
          clickToPlay: false,
          toggleInvert: false,
          loop: {active: true},
          vimeo: {
            loop: true,
            autoplay: true,
            muted: false,
            gesture: 'media',
            playsinline: true,
            byline: false,
            portrait: false,
            title: false,
            speed: true,
            transparent: false,
            controls: false,
            background: true,
          },
          ...extraVideoProps,
        },
      },
    }
  },
  custom: ({src, extraVideoProps}: VideoSrcLinkProps) => {
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,
      videoProps: {
        width: '100%',
        height: '100%',
        autoPlay: 'autoplay',
        muted: true,
        loop: true,
        controls: false,
        style: {objectFit: 'initial', height: '100%'},
        ...extraVideoProps,
      },
      sourceSet: SourceElement(src),
    }
  },
}

export const getVideoMedia = ({data, options = {}, extraVideoProps = {}}: DzMediaVideoMapper) => {
  const {externalVideo, provider, video} = data ?? {}
  const {asset} = video ?? {}
  const videoSrc = asset ? videoBuilder(asset) : ''
  const src = externalVideo ?? videoSrc
  const videoProps = linksFromSource[provider]?.({src, extraVideoProps})

  return {
    media: {
      type: MEDIA_TYPES.VIDEO,
      ...videoProps,
      ...options,
    },
    hideMedia: !src,
    hideImage: !src,
    extras: null,
  }
}

export const getImageMedia = (
  {data, url, ImgElement, options = {}, extraImgProps = {}}: DzMediaImageMapper,
  keyOptions: KeyOptions = {imagesKey: 'photos'}
) => {
  const {src, alt, caption} = imageMapper(data, keyOptions)
  return {
    media: {
      url,
      type: MEDIA_TYPES.IMAGE,
      ImgElement,
      imgProps: {
        src,
        alt,
        fill: true,
        ...extraImgProps,
      },
      ...options,
    },
    hideMedia: !src,
    hideImage: !src,
    extras: {
      caption,
    },
  }
}

export const dzMediaMapper = (
  media: DzMediaMapper,
  options: KeyOptions = {imagesKey: 'photos'}
) => {
  const {type} = media?.data ?? {}
  return type === MEDIA_TYPES.VIDEO
    ? getVideoMedia(media as DzMediaVideoMapper)
    : getImageMedia(media as DzMediaImageMapper, options)
}
