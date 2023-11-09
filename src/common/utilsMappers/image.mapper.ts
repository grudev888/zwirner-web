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
  posterImage?: any
  useMobileKey?: boolean
}

interface DzMediaVideoMapper {
  data: any
  override?: any
  options?: Partial<DzMediaProps>
  extraVideoProps?: any
}

type DzMediaMapper = (DzMediaImageMapper | DzMediaVideoMapper) & {asMediaCard?: boolean}

const getPrivateVimeoId = (urlObject: any) => {
  const pathname = urlObject?.pathname || ''
  const pathnameSplit = pathname.split('/')

  // handle unlisted url format like https://vimeo.com/827055816/318fa72e32
  if (pathnameSplit.length > 2) {
    return pathnameSplit.slice(1, 3).join('?h=')
  }

  const videoId = pathnameSplit.pop()
  return videoId ? `${videoId}${urlObject?.search}` : ''
}

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
  youtube: ({src, extraVideoProps = {}, posterImage, useMobileKey}: VideoSrcLinkProps) => {
    const urlObject = src ? new URL(src).searchParams : null
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
      [useMobileKey ? 'mobileVideoProps' : 'videoProps']: {
        source: {
          type: 'video',
          posterImage,
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
  vimeo: ({src, extraVideoProps = {}, posterImage, useMobileKey}: VideoSrcLinkProps) => {
    const urlObject = src ? new URL(src) : null
    const isPrivate =
      urlObject?.search?.includes('?h=') || (urlObject?.pathname?.split('/')?.length || 0) > 2
    const publicId = !isPrivate ? urlObject?.pathname?.replace(/\//, '') : ''
    const privateId = isPrivate ? getPrivateVimeoId(urlObject) : ''

    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
      [useMobileKey ? 'mobileVideoProps' : 'videoProps']: {
        source: {
          type: 'video',
          posterImage,
          sources: [
            {
              src: isPrivate ? privateId : publicId,
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
  custom: ({src, extraVideoProps, posterImage, useMobileKey}: VideoSrcLinkProps) => {
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,
      posterImage,
      [useMobileKey ? 'mobileVideoProps' : 'videoProps']: {
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
  const {url, desktopProviderURL, mobileProviderURL, posterImage} = video ?? {}
  const isVideoRecord = type === MediaTypes.VIDEO_RECORD
  const vimeoChecker = new RegExp(vimeoRegex)
  const youtubeChecker = new RegExp(youtubeRegex)
  const youtubeKey = youtubeChecker.test(desktopProviderURL) ? 'youtube' : null
  const vimeoKey = vimeoChecker.test(desktopProviderURL) ? 'vimeo' : null
  const youtubeMobileKey = youtubeChecker.test(mobileProviderURL) ? 'youtube' : null
  const vimeoMobileKey = vimeoChecker.test(mobileProviderURL) ? 'vimeo' : null
  const customKey = type === MediaTypes.VIDEO ? 'custom' : ''
  const videoSource = isVideoRecord ? desktopProviderURL : url
  const videoProps = linksFromSource[youtubeKey ?? vimeoKey ?? customKey]?.({
    src: videoSource,
    posterImage,
    extraVideoProps,
  })
  const mobileVideoProps = mobileProviderURL
    ? linksFromSource[youtubeMobileKey ?? vimeoMobileKey ?? '']?.({
        src: mobileProviderURL,
        posterImage,
        useMobileKey: true,
        extraVideoProps,
      })
    : {}

  return {
    media: {
      type: MEDIA_TYPES.VIDEO,
      ...mobileVideoProps,
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
    override && Object.keys(override).length > 0 && override?.type && override?.type !== 'Unset'
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
  const {type, ImgElement} = media?.data ?? {}
  const mediaMapped =
    type === MediaTypes.VIDEO || type === MediaTypes.VIDEO_RECORD
      ? getVideoMedia(media as DzMediaVideoMapper)
      : getImageMedia(media as DzMediaImageMapper)

  const {asMediaCard} = media ?? {}

  /*
    Image -> Image, Image is used as the card view
    Image -> Custom Video, do no show video in card
    Image -> Video Record
    * If poster image is added, then the poster image should be used in the card view
    * If no poster image is added, then do not display video in card view.
  */

  const videoAsMediaCard = asMediaCard && mediaMapped?.media?.type === MEDIA_TYPES.VIDEO
  if (videoAsMediaCard && type === MediaTypes.VIDEO) {
    return {
      media: {},
      hideMedia: true,
      hideImage: true,
      extras: null,
    }
  }

  if (videoAsMediaCard) {
    const {videoProps, url} = mediaMapped?.media ?? {}
    const {source} = videoProps ?? {}
    const {posterImage} = source ?? {}
    const hideVideo = !posterImage
    return {
      media: {
        url,
        type: MEDIA_TYPES.IMAGE,
        ImgElement,
        imgProps: {
          src: posterImage,
          alt: 'Media Image',
          fill: true,
          ...(media as DzMediaImageMapper)?.extraImgProps,
        },
        ...(media as DzMediaImageMapper)?.options,
      },
      hideMedia: hideVideo,
      hideImage: hideVideo,
      extras: null,
    }
  }

  return mediaMapped
}
