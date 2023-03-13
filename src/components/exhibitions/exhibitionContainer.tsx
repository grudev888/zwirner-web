import type {SanityDocument} from '@sanity/client'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'

import {builder} from '@/sanity/imageBuilder'
import {createRandomUUID} from '@/sanity/lib/uuid'

import styles from './exhibitions.styles.module.css'

interface ExhibitionsContainerProps {
  exhibitions: SanityDocument[]
}

interface ExhibitionProps {
  exhibition: any
}

const getSlug = (title = '') =>
  title
    .toLowerCase()
    .replace(/[|&;$%@"-.<>:()+,]/g, '')
    .replace(/ /g, '-')

const Exhibition: FC<ExhibitionProps> = ({exhibition}) => {
  const {title, summary, startDate, events = []} = exhibition ?? {}
  const {photos} = events?.[0] ?? {}
  const url = photos?.[0]?.asset ? builder.image(photos[0].asset).width(1472).height(729).url() : ''

  return (
    <Link href={getSlug(title)}>
      <div className={cn(styles.showcase, 'group')}>
        {url ? <Image className={styles.image} src={url} alt={`exhibition-${title}`} fill /> : null}
        <div className={cn(styles.overlay, 'opacity-50')}></div>
        <div className={styles.titleContainer}>
          <div className={styles.leftChild}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.descriptionElement}>{summary}</p>
            <p className={styles.descriptionElement}>{startDate}</p>
          </div>
          <div className={styles.rightChild}>
            <h2 className={styles.year}>{startDate}</h2>
            {/* <p className={styles.location}>{location}</p> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ExhibitionsContainer: FC<ExhibitionsContainerProps> = ({exhibitions = []}) => {
  return (
    <ul className={styles.container}>
      {exhibitions.map((exhibition) => {
        return (
          <li className={styles.exhibitionItem} key={exhibition?.id ?? createRandomUUID()}>
            <Exhibition exhibition={exhibition} />
          </li>
        )
      })}
    </ul>
  )
}

export default ExhibitionsContainer
