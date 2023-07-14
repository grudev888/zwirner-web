import {
  CARD_TYPES,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  MEDIA_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import {ONLINE_EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ArticleTypes} from '@/components/containers/articles/mapper'
import {builder} from '@/sanity/imageBuilder'

const formatDate = (date: string) => {
  const dateParsed = new Date(date)
  const monthPlusDay = dateParsed.toLocaleString('default', {month: 'long', day: 'numeric'})
  const year = dateParsed.getFullYear()
  return monthPlusDay && year ? `${monthPlusDay}, ${year}` : ''
}
export const articlesGridMap = (data: any[]) => {
  return data?.map((relatedArticles) => {
    const {
      _id,
      date,
      displayDate,
      description,
      image,
      title,
      type,
      slug,
      _type,
      exhibition,
      externalURL,
    } = relatedArticles ?? {}
    const {current} = slug ?? {}
    const {photos, summary, endDate, startDate} = exhibition ?? {}
    const [mainPhotoExhibition] = photos ?? []
    const {image: internalImage} = image ?? {}
    const {alt, asset} = internalImage ?? mainPhotoExhibition ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    const hideImage = !asset || !imgSrc

    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${ONLINE_EXHIBITIONS_URL}/${current}` : null
    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : current
    const articleURL = _type === 'article' ? urlToRedirect : null

    const articleDate = displayDate
      ? displayDate
      : _type === 'article' && date
      ? formatDate(date)
      : null

    const cardDate = articleDate ?? new Date(startDate ?? endDate).getFullYear()
    const urlToContent = exhibitionURL ?? articleURL
    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      hideImage,
      media: {
        url: urlToContent,
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
      title,
      enableZoom: true,
      cardLink: {
        href: urlToContent,
      },
      secondaryTitle: description ?? summary,
      secondarySubtitle: cardDate,
    }
  })
}

export const guideGrid = (data: any) => {
  const {displayNumberOfResults, items, itemsPerRow} = data ?? {}

  const cards = articlesGridMap(items) ?? []
  return {
    cards,
    displayNumberOfResults,
    useLink: true,
    steps: [
      {
        id: 1,
        numberOfColumns: itemsPerRow,
        icon: <Fragment />,
      },
    ],
  }
}

export const interstitialMap = (data: any) => {
  const {title, subtitle, cta, image} = data ?? {}
  const {text} = cta ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    data: {
      fullWidth: true,
      split: false,
      title: title,
      description: subtitle,
      primaryCta: {
        text,
      },
      media: {
        ImgElement: Image,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
        objectFit: MEDIA_OBJECT_FIT.COVER,
      },
    },
  }
}
