import {EditorialType, MEDIA_TYPES} from '@zwirner/design-system'
import Image from 'next/image'
import {ReactNode} from 'react'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {builder} from '@/sanity/imageBuilder'
import {DzEditorialSchemaProps, EditorialTextTypes} from '@/sanity/types'

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

type EditorialData = {
  textType: EditorialTextTypes
  text: ReactNode
}

export const dzEditorialOverrides = (props: DzEditorialSchemaProps) => {
  const {
    editorialType,
    editorialTextOverrides = [],
    editorialTextOverridesSimple = [],
    quoteTitle,
    quoteFootNote,
    reverse = false,
    imageOverride,
  } = props ?? {}

  const {media} = dzMediaMapper({
    data: imageOverride,
    ImgElement: Image,
  })

  const quoteTitleText = safeText({
    text: quoteTitle,
    key: 'quote',
    customStyles: {
      normal: 'text-xl md:!text-xxl',
    },
  })

  const quoteDetailText = safeText({
    text: quoteFootNote,
    key: 'quoteDetail',
    customStyles: {
      normal: 'text-sm md:!text-lg',
    },
  })

  let editorialData: EditorialData[] = []
  if (editorialType === EditorialType.SIMPLE) {
    editorialData = [{textType: EditorialTextTypes.PARAGRAPH, text: editorialTextOverridesSimple}]
  } else if (editorialType === EditorialType.COMPLEX) {
    editorialData = editorialTextOverrides
  }

  const paragraphs = editorialData?.map(({textType, text}) => ({
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
            ? 'text-lg md:!text-xl !mb-5 md:!mb-10'
            : 'text-sm md:!text-md !mb-5 md:!mb-10',
      },
    }),
  }))

  return {
    type: editorialType,
    data: {
      paragraphs,
      ...quoteTitleText,
      ...quoteDetailText,
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
