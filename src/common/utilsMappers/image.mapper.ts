import {DzMediaProps, MEDIA_TYPES, MEDIA_VIDEO_SOURCE_TYPES} from '@zwirner/design-system'

import {SourceElement} from '@/common/utilsMappers/components/elements'
import {builder} from '@/sanity/imageBuilder'
import {MediaTypes} from '@/sanity/types'

interface DzMediaImageMapper {
  data: any
  override?: any
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
  override?: any
  options?: Partial<DzMediaProps>
  extraVideoProps?: any
}

type DzMediaMapper = DzMediaImageMapper | DzMediaVideoMapper

export const validateImage = (data: any) => {
  const {photos, heroMedia} = data ?? {}
  const {image: heroImage} = heroMedia ?? {}
  const [mainPicture] = photos ?? []
  const {asset, image, url} = mainPicture ?? heroImage ?? {}

  return image && image?.asset ? !!image.asset : !!asset ?? !!url
}

export const imageMapper = (data: any) => {
  const {
    photos,
    heroMedia,
    image: sourceImage,
    asset: srcAsset,
    alt: altAsset,
    caption: captionAsset,
  } = data ?? {}

  const [mainPicture] = photos ?? []
  const {asset, alt, image, caption, url} = mainPicture ?? heroMedia ?? sourceImage ?? {}
  const {alt: imageBuilderAlt, asset: imageBuilderAsset, caption: imageBuilderCaption} = image ?? {}
  const pictureAsset = imageBuilderAsset ?? srcAsset ?? asset
  const imgCaption = imageBuilderCaption ?? captionAsset ?? caption
  const imgSrc = pictureAsset ? builder.image(pictureAsset).url() : ''
  const imgAlt = imageBuilderAlt ?? altAsset ?? alt

  return {
    alt: imgAlt,
    src: pictureAsset ? imgSrc : url,
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

const vimeoRegex =
  /(?:https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/
const youtubeRegex =
  /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/

export const getVideoMedia = ({data, options = {}, extraVideoProps = {}}: DzMediaVideoMapper) => {
  const {video, type} = data ?? {}
  const {url, desktopProviderURL} = video ?? {}
  const isVideoRecord = type === MediaTypes.VIDEO_RECORD
  const vimeoChecker = new RegExp(vimeoRegex)
  const youtubeChecker = new RegExp(youtubeRegex)
  const youtubeKey = youtubeChecker.test(desktopProviderURL) ? 'youtube' : null
  const vimeoKey = vimeoChecker.test(desktopProviderURL) ? 'vimeo' : null
  const customKey = type === MediaTypes.VIDEO ? 'custom' : ''
  const videoSource = isVideoRecord ? desktopProviderURL : url

  const videoProps = linksFromSource[youtubeKey ?? vimeoKey ?? customKey]?.({
    src: videoSource,
    extraVideoProps,
  })

  return {
    media: {
      type: MEDIA_TYPES.VIDEO,
      ...videoProps,
      ...options,
    },
    hideMedia: !videoSource,
    hideImage: !videoSource,
    extras: null,
  }
}

export const getImageMedia = ({
  override,
  data,
  url,
  ImgElement,
  options = {},
  extraImgProps = {},
}: DzMediaImageMapper) => {
  const mediaOverrideSource =
    override && Object.keys(override).length > 0 && override?.type !== 'Unset' && override.image
      ? override
      : null

  const {src, alt, caption} = imageMapper(mediaOverrideSource ?? data)
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

export const dzMediaMapper = (media: DzMediaMapper) => {
  const {type} = media?.data ?? {}
  return type === MediaTypes.VIDEO || type === MediaTypes.VIDEO_RECORD
    ? getVideoMedia(media as DzMediaVideoMapper)
    : getImageMedia(media as DzMediaImageMapper)
}
