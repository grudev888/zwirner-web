import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'
import {DzEditorialSchemaProps} from '@/sanity/types'

export const editorialMapper = (data: any) => {
  return data
}

// TODO retrieve constant from the design system
export const EDITORIAL_TEXT_TYPES = {
  PARAGRAPH: 'paragraph',
  QUOTE: 'quote',
}

export const EDITORIAL_TEXT_NAMES = [
  EDITORIAL_TEXT_TYPES.PARAGRAPH,
  EDITORIAL_TEXT_TYPES.QUOTE,
] as const

const getTextFromOverride = (override: any) => {
  return override?.map((t: any) => {
    const {text, textType: type} = t
    return {text, type}
  })
}

export const dzEditorialOverrides = (props: DzEditorialSchemaProps) => {
  const {imageOverride, enableOverrides} = props
  if (!enableOverrides) return {}
  const {asset, alt, url} = imageOverride ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const media = imgSrc
    ? {
        media: {
          url,
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
      }
    : {}
  return {
    data: {
      ...media,
    },
  }
}

export const contentTypesMapper: any = {
  press: (data: any) => {
    const {editorialType, authors, summary, title, editorialTextOverrides} = data
    const [mainAuthor] = authors ?? []
    const {picture} = mainAuthor ?? {}
    const {asset, alt} = picture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      type: editorialType,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        reverse: true,
        paragraphs: getTextFromOverride(editorialTextOverrides),
        quote: summary,
        quoteDetail: title,
      },
    }
  },
  book: (data: any) => {
    const {editorialType, editorialTextOverrides, photos, summary, title} = data
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''

    return {
      type: editorialType,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        reverse: true,
        paragraphs: getTextFromOverride(editorialTextOverrides),
        quote: summary,
        quoteDetail: title,
      },
    }
  },
}
