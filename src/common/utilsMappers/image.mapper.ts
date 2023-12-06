import {DzMediaProps, MEDIA_TYPES} from '@zwirner/design-system'
import {getVideoMedia} from '@zwirner/design-system'

import {ARTWORK_BG_COLOR_NAMES} from '@/components/pageBuilder/DzCard/cardMapper'
import {builder} from '@/sanity/imageBuilder'
import {MediaTypes} from '@/sanity/types'

interface DzMediaImageMapper {
  data: any
  override?: any
  url?: string
  ImgElement: any
  options?: Partial<DzMediaProps>
  extraImgProps?: any
  backgroundColor?: ARTWORK_BG_COLOR_NAMES
}

interface DzMediaVideoMapper {
  data: any
  override?: any
  options?: Partial<DzMediaProps>
  extraVideoProps?: any
}

type DzMediaMapper = (DzMediaImageMapper | DzMediaVideoMapper) & {asMediaCard?: boolean}

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
  const {backgroundColor} = override ?? {}
  return {
    media: {
      url,
      type: MEDIA_TYPES.IMAGE,
      ImgElement,
      backgroundColor,
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
