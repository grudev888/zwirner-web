import {MEDIA_ASPECT_RATIOS, MEDIA_OBJECT_FIT, TITLE_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {
  EXHIBITIONS,
  EXHIBITIONS_URL,
  FAIRS,
  LOCATION,
  READ_MORE,
} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {ArticleTypes, MediaTypes} from '@/sanity/types'

export const heroMapper = (data: any) => {
  const {title, type, header, image} = data ?? {}

  const {type: headerImageType} = header?.[0] ?? {}
  const sourceImage = Object.values(MediaTypes).includes(headerImageType)
    ? header?.[0]
    : header?.[0]?.photos?.[0]

  const {media, hideMedia} = dzMediaMapper({
    data: type === ArticleTypes.INTERNAL ? sourceImage : image,
    ImgElement: Image,
  })
  return {
    hideMedia,
    media,
    title: title,
  }
}

export const articlesGridMap = (data: any[]) => {
  return data?.map((relatedArticles) => {
    const {
      _id,
      description,
      title,
      type,
      slug,
      _type,
      exhibition,
      externalURL,
      category,
      header,
      image,
    } = relatedArticles ?? {}
    const {current} = slug ?? {}
    const {summary} = exhibition ?? {}

    const isArticle = _type === 'article'

    const sharedImageOptions = {
      objectFit: MEDIA_OBJECT_FIT.COVER,
      aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
    }

    const {type: headerImageType} = header?.[0] ?? {}
    const sourceImage = Object.values(MediaTypes).includes(headerImageType)
      ? header?.[0]
      : header?.[0]?.photos?.[0]

    const {media: relatedArticleMedia, hideImage: hideImgArticle} = dzMediaMapper({
      data: type === ArticleTypes.INTERNAL ? sourceImage : image ?? relatedArticles,
      ImgElement: Image,
      options: sharedImageOptions,
    })
    const {media: exhibitionMedia, hideImage: hideImgExhibition} = dzMediaMapper({
      data: exhibition,
      ImgElement: Image,
      options: sharedImageOptions,
    })

    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${EXHIBITIONS_URL}/${current}` : null
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : '/'
    const articleURL = isArticle ? urlToRedirect : null

    const categoryCard =
      _type === 'exhibitionPage' ? EXHIBITIONS : _type === 'fairPage' ? FAIRS : category

    const safeDescription = safeText({text: description, key: 'description'})

    return {
      id: _id,
      media: isArticle ? relatedArticleMedia : exhibitionMedia,
      hideImage: isArticle ? hideImgArticle : hideImgExhibition,
      category: categoryCard,
      title,
      ...safeDescription,
      description: description ? undefined : summary,
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

export const articleDatesMapper = (date: string | null) => {
  if (!date) return null

  const parsedDate = new Date(`${date} EST`)

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return {
    title: dateFormatter.format(parsedDate),
    titleType: TITLE_TYPES.P,
  }
}
