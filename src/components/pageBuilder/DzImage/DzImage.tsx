import Image from 'next/image'
import {FC} from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './dzImage.module.css'

const contentTypesMapper: any = {
  artist: (data: any) => {
    const {picture} = data
    const {asset, alt: imgAlt} = picture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {imgSrc, imgAlt}
  },
  artwork: (data: any) => {
    const {photos} = data
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {imgSrc, imgAlt}
  },
  exhibition: (data: any) => {
    const {events} = data
    const [event] = events
    const {photos} = event
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {imgSrc, imgAlt}
  },
}
interface DzImageProps {
  data: any
}

export const DzImage: FC<DzImageProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)
  const {imgSrc, imgAlt} = mappedData ?? {}
  return (
    <>
      <h1 className={styles.title}>{_type} Image</h1>
      <div className={styles.imageContainer}>
        <Image className={styles.image} src={imgSrc} alt={imgAlt || 'Hero Image'} fill />
      </div>
    </>
  )
}

export default DzImage
