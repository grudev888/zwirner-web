import {MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import {safeText} from '@/common/utilsMappers/safe'

import {builder} from '@/sanity/imageBuilder'
import {DzEditorialSchemaProps, EditorialTextTypes} from '@/sanity/types'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

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
  const {
    editorialType,
    editorialTextOverrides = [],
    quoteTitle,
    quoteFootNote,
    reverse = false,
    imageOverride,
  } = props ?? {}
  const {media} = dzMediaMapper({
    data: imageOverride,
    ImgElement: Image,
  })
  const paragraphs = editorialTextOverrides?.map(({textType, text}) => ({
    type:
      textType === EditorialTextTypes.QUOTE
        ? EDITORIAL_TEXT_TYPES.QUOTE
        : EDITORIAL_TEXT_TYPES.PARAGRAPH,
    ...safeText({
      key: 'text',
      text,
      customStyles: {
        normal:
          textType === EditorialTextTypes.QUOTE
            ? 'text-lg md:text-xl mb-5 md:mb-10'
            : 'text-sm md:text-md mb-5 md:mb-10',
      },
    }),
  }))
  return {
    type: editorialType,
    data: {
      paragraphs,
      quote: quoteTitle,
      quoteDetail: quoteFootNote,
      reverse,
      media,
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
