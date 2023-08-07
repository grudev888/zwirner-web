import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

interface DzMediaMapperProps {
  data: any
  url?: string
  ImgElement: any
  options?: any
  extraImgProps?: any
}

export const validateImage = (data: any) => {
  const {photos} = data ?? {}
  const [mainPicture] = photos ?? []
  const {asset, image} = mainPicture ?? {}
  return image ? !!image.asset : !!asset
}

export const imageMapper = (data: any) => {
  const {
    photos,
    image: sourceImage,
    asset: srcAsset,
    alt: altAsset,
    caption: captionAsset,
  } = data ?? {}
  const [mainPicture] = photos ?? []
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

export const dzMediaMapper = ({
  data,
  url,
  ImgElement,
  options = {},
  extraImgProps = {},
}: DzMediaMapperProps) => {
  const {src, alt, caption} = imageMapper(data)
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
