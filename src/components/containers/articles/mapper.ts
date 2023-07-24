import {
  ButtonModes,
  CARD_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  MEDIA_TYPES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'

import {EXHIBITIONS, FAIRS, ONLINE_EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {builder} from '@/sanity/imageBuilder'

export const heroMapper = (data: any) => {
  const {image, title} = data ?? {}
  const {alt, asset} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    hideMedia: !imgSrc,
    media: {
      type: MEDIA_TYPES.IMAGE,
      ImgElement: Image,
      imgProps: {
        src: imgSrc,
        alt,
        fill: true,
      },
    },
    title: title,
  }
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      fullWidth: true,
      split: false,
      title,
      primaryCta: {
        text,
        ctaProps: {
          mode: ButtonModes.DARK,
        },
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
    const {_id, description, image, title, type, slug, _type, exhibition, externalURL, category} =
      relatedArticles ?? {}
    const {current} = slug ?? {}
    const {photos, summary} = exhibition ?? {}
    const [mainPhotoExhibition] = photos ?? []
    const {image: internalImage} = image ?? {}
    const {alt, asset} = internalImage ?? mainPhotoExhibition ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${ONLINE_EXHIBITIONS_URL}/${current}` : null
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : '/'
    const articleURL = _type === 'article' ? urlToRedirect : null

    const categoryCard =
      _type === 'exhibitionPage' ? EXHIBITIONS : _type === 'fairPage' ? FAIRS : category

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
        objectFit: MEDIA_OBJECT_FIT.COVER,
        aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
      },
      category: categoryCard,
      title,
      description: description ?? summary,
      linkCTA: {
        text: 'Read More',
        linkElement: 'a',
        url: exhibitionURL ?? articleURL,
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

export const descriptionTitleMapper = (data: any) => {
  const description = data ?? {}
  return {
    subtitle: description,
    titleType: TITLE_TYPES.P,
  }
}

const datesText = (from: string, to: string) => {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const shareMonth = fromDate.getMonth() === toDate.getMonth()
  const eventYear = new Date(from ?? to).getFullYear()

  const fromText = fromDate.toLocaleString('default', {month: 'long', day: 'numeric'})
  const toText = toDate.toLocaleString('default', {
    ...(shareMonth ? {} : {month: 'long'}),
    day: 'numeric',
  })
  return `${fromText}—${toText}, ${eventYear}`
}

export const articleDatesMapper = (data: any) => {
  const dateSelection = data ?? {}
  const {dateRange} = dateSelection ?? {}
  const dateTitle = dateRange?.from ? 'Dates' : 'Date'

  return {
    title: dateTitle,
    subtitle:
      dateSelection.year ??
      dateSelection.approximate ??
      datesText(dateRange?.from, dateRange?.to) ??
      '',
    titleType: TITLE_TYPES.P,
  }
}
