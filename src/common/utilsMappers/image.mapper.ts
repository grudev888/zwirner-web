import {DzMediaProps, MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

interface DzMediaMapperProps {
  data: any
  url?: string
  ImgElement: any
  options?: Partial<DzMediaProps>
  extraImgProps?: any
}

export const validateImage = (data: any) => {
  const {photos} = data ?? {}
  const [mainPicture] = photos ?? []
  const {asset, image} = mainPicture ?? {}
  return image ? !!image.asset : !!asset
}

export const imageMapper = (data: any) => {
  const {photos, image: sourceImage} = data ?? {}
  const [mainPicture] = photos ?? []
  const {asset, alt, image} = mainPicture ?? sourceImage ?? {}
  const {alt: imageBuilderAlt, asset: imageBuilderAsset} = image ?? {}
  const imgSrc =
    imageBuilderAsset || asset
      ? builder.image(imageBuilderAsset ? imageBuilderAsset : asset).url()
      : ''
  const imgAlt = imageBuilderAlt ? imageBuilderAlt : alt

  return {
    alt: imgAlt,
    src: imgSrc,
  }
}

export const dzMediaMapper = ({
  data,
  url,
  ImgElement,
  options = {},
  extraImgProps = {},
}: DzMediaMapperProps) => {
  const {src, alt} = imageMapper(data)
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
  }
}
