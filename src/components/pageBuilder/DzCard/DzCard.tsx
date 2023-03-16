import {PortableText} from '@portabletext/react'
import Image from 'next/image'
import {FC} from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './dzcard.module.css'

const contentTypesMapper: any = {
  artist: (data: any) => {
    const {birthdate, picture, fullName, description} = data
    const {asset, alt: imgAlt} = picture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle: birthdate, mainTitle: fullName, imgSrc, imgAlt, description}
  },
  artwork: (data: any) => {
    const {photos, dimensions, title} = data
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle: dimensions, mainTitle: title, imgSrc, imgAlt}
  },
  exhibition: (data: any) => {
    const {events, subtitle, title, description} = data
    const [event] = events
    const {photos} = event
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle, mainTitle: title, imgSrc, imgAlt, description}
  },
}

interface DzCardProps {
  data: any
}

export const DzCard: FC<DzCardProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)
  const {subtitle, mainTitle, imgSrc, imgAlt, description} = mappedData ?? {}

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        {imgSrc ? (
          <Image className={styles.image} src={imgSrc} alt={imgAlt || 'Card Image'} fill />
        ) : null}
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {description ? <PortableText value={description} /> : null}
      </div>
    </div>
  )
}

export default DzCard
