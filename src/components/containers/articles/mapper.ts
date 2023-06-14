import {
  CARD_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_TYPES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'

import {builder} from '@/sanity/imageBuilder'

export const headingImageMapper = (data: any) => {
  const {image} = data ?? {}
  const {alt, asset} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src: imgSrc,
      alt,
      fill: true,
    },
    ImgElement: Image,
  }
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      split: false,
      title,
      primaryCta: {
        text,
      },
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}

export enum ArticleTypes {
  INTERNAL = 'internalNews',
  PRESS = 'pressRelease',
  EXTERNAL = 'externalNews',
}

export const articlesGridMap = (data: any[]) => {
  return data?.map((relatedArticles) => {
    const {_id, description, image, title, type, externalURL, category} = relatedArticles ?? {}
    const {image: internalImage} = image ?? {}
    const {alt, asset} = internalImage ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : '/'
    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      media: {
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt: alt,
          fill: true,
        },
        ImgElement: Image,
      },
      category,
      title,
      description,
      linkCTA: {
        text: 'Read More',
        linkElement: 'a',
        url: urlToRedirect,
      },
    }
  })
}

export const locationTitleMapper = (data: any) => {
  const {name} = data ?? {}
  return {
    title: 'Location',
    subtitle: name,
    titleType: TITLE_TYPES.P,
  }
}
const range = (dateString: string) => {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', {month: 'long', day: 'numeric'})
  return month
}

export const eventDatesMapper = (data: any) => {
  const {dateSelection} = data ?? {}
  const {dateRange} = dateSelection ?? {}
  const fromDate = dateRange?.from ? range(dateRange?.from) : ''
  const toDate = dateRange?.to ? range(dateRange?.to) : ''
  const eventYear = new Date(dateRange?.from ?? dateRange?.to).getFullYear()

  return {
    title: 'Dates',
    subtitle: `${fromDate}-${toDate}, ${eventYear}`,
    titleType: TITLE_TYPES.P,
  }
}
