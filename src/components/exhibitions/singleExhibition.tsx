import Image from 'next/image'
import * as React from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './singleExhibition.styles.module.css'
interface SingleExhibitionProps {
  exhibition: any
}

export const SingleExhibition: React.FunctionComponent<SingleExhibitionProps> = ({
  exhibition = {},
}) => {
  const {title, summary, startDate, events = []} = exhibition ?? {}
  const {photos} = events?.[0] ?? {}
  const url = photos?.[0]?.asset ? builder.image(photos[0].asset).width(1472).height(729).url() : ''
  return (
    <div className={styles.exhibition}>
      <div className={styles.header}>
        {url ? <Image className={styles.image} src={url} alt={`exhibition-${title}`} fill /> : null}
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.artData}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.descriptionElement}>{summary}</p>
        <p className={styles.descriptionElement}>{startDate}</p>
      </div>
    </div>
  )
}

export default SingleExhibition
