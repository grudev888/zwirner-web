import {PortableText} from '@portabletext/react'
import {getImageDimensions} from '@sanity/asset-utils'
import Image from 'next/image'
import {FC} from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './dzRichText.module.css'

const contentTypesMapper: any = {
  artist: (data: any) => {
    const {description, fullName} = data
    return {mainTitle: fullName, description}
  },
  artwork: (data: any) => {
    const {title, dimensions} = data
    return {mainTitle: title, extraData: dimensions}
  },
  exhibition: (data: any) => {
    const {description, title} = data
    return {mainTitle: title, description}
  },
}

interface DzRichTextProps {
  data: any
}

const SampleImageComponent = ({value, isInline}: any) => {
  const {width, height} = getImageDimensions(value)
  return (
    <Image
      src={builder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      width={800}
      height={800}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}
const components = {
  types: {
    image: SampleImageComponent,
  },
}

export const DzRichText: FC<DzRichTextProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)
  const {description, mainTitle, extraData} = mappedData ?? {}

  return (
    <div className={styles.editorContainer}>
      <h2 className={styles.mainTitle}>{mainTitle}</h2>
      {extraData ? (
        <p>{extraData}</p>
      ) : (
        <PortableText value={description} components={components} />
      )}
    </div>
  )
}

export default DzRichText
