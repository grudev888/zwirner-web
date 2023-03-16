import Image from 'next/image'
import {FC} from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './dzHero.module.css'

const contentTypesMapper: any = {
  artist: (data: any) => {
    const {birthdate, picture, fullName} = data
    const {asset, alt: imgAlt} = picture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle: birthdate, mainTitle: fullName, imgSrc, imgAlt}
  },
  artwork: (data: any) => {
    const {photos, dimensions, title} = data
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle: dimensions, mainTitle: title, imgSrc, imgAlt}
  },
  exhibition: (data:any) => {
    const {events, subtitle, title} = data;
    const [event]= events
    const {photos}= event
    const [mainPicture] = photos
    const {asset, alt: imgAlt} = mainPicture
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {subtitle, mainTitle: title, imgSrc, imgAlt}
  }
}

interface DzHeroProps {
  data: any
}

export const DzHero: FC<DzHeroProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)
  const {subtitle, mainTitle, imgSrc, imgAlt} = mappedData ?? {}

  return (
    <div className={styles.heroContainer}>
      <div className={styles.imgContainer}>
        {imgSrc ? (
          <Image className={styles.image} src={imgSrc} alt={imgAlt || 'Hero Image'} fill />
        ) : null}
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h1 className={styles.mainTitle}>{mainTitle}</h1>
      </div>
    </div>
  )
}

export default DzHero
