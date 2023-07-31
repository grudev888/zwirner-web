import {
  ButtonModes,
  CARD_TYPES,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  TITLE_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'

import {
  EXHIBITIONS,
  FAIRS,
  LOCATION,
  ONLINE_EXHIBITIONS_URL,
  READ_MORE,
} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export const heroMapper = (data: any) => {
  const {title} = data ?? {}

  const {media, hideMedia} = dzMediaMapper({data, ImgElement: Image})
  return {
    hideMedia,
    media,
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
    const {_id, description, title, type, slug, _type, exhibition, externalURL, category} =
      relatedArticles ?? {}
    const {current} = slug ?? {}
    const {summary} = exhibition ?? {}
    const isArticle = _type === 'article'

    const sharedImageOptions = {
      objectFit: MEDIA_OBJECT_FIT.COVER,
      aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
    }

    const {media: relatedArticleMedia} = dzMediaMapper({
      data: relatedArticles,
      ImgElement: Image,
      options: sharedImageOptions,
    })
    const {media: exhibitionMedia} = dzMediaMapper({
      data: exhibition,
      ImgElement: Image,
      options: sharedImageOptions,
    })

    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${ONLINE_EXHIBITIONS_URL}/${current}` : null
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : '/'
    const articleURL = isArticle ? urlToRedirect : null

    const categoryCard =
      _type === 'exhibitionPage' ? EXHIBITIONS : _type === 'fairPage' ? FAIRS : category

    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      media: isArticle ? relatedArticleMedia : exhibitionMedia,
      category: categoryCard,
      title,
      description: description ?? summary,
      linkCTA: {
        text: READ_MORE,
        linkElement: 'a',
        url: exhibitionURL ?? articleURL,
      },
    }
  })
}

export const locationTitleMapper = (data: any) => {
  const {name} = data ?? {}
  return {
    title: LOCATION,
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
