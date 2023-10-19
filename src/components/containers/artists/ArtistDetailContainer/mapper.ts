import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export const mapBiography = (data: any) => {
  if (!data) return null
  const {media} = dzMediaMapper({data: data.biographyPicture, ImgElement: Image})

  return {
    media,
    description: data.description,
  }
}
