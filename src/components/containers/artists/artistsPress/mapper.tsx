import {CARD_TYPES, MEDIA_TYPES} from '@zwirner/design-system'
import {Fragment} from 'react'

import {ARTICLES, EXHIBITIONS_URL, LEARN_MORE} from '@/common/constants/commonCopies'
import {safeText} from '@/common/utilsMappers/safe'
import {ArticleTypes} from '@/sanity/types'

export const articlesGridMap = (data: any[]) => {
  return data?.map((relatedArticles) => {
    const {
      _id,
      date,
      displayDate,
      description,
      subtitle,
      title,
      type,
      slug,
      _type,
      exhibition,
      externalURL,
    } = relatedArticles ?? {}
    const {current} = slug ?? {}
    const {summary, endDate, startDate} = exhibition ?? {}

    const secondaryTitleText = safeText({key: 'secondaryTitle', text: subtitle ?? summary})
    const exhibitionURL =
      _type === 'exhibitionPage' && current ? `${EXHIBITIONS_URL}/${current}` : null

    const urlToRedirect = type === ArticleTypes.EXTERNAL ? externalURL : current

    const articleURL = _type === 'article' ? urlToRedirect : null

    const cardDate = displayDate
      ? displayDate
      : new Date(date ?? endDate ?? startDate).getFullYear()

    const urlToContent = exhibitionURL ?? articleURL

    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      hideImage: true,
      title,
      // Press hide images
      media: {
        type: MEDIA_TYPES.IMAGE,
      },
      ...(secondaryTitleText ?? {}),
      secondarySubtitle: cardDate,
      ...safeText({key: 'description', text: description}),
      enableZoom: true,
      cardLink: {
        href: urlToContent,
      },
      linkCTA: {
        text: LEARN_MORE,
        linkElement: 'a',
        url: urlToContent,
      },
    }
  })
}

export const guideGrid = (data: any) => {
  const {displayNumberOfResults, items, itemsPerRow} = data ?? {}

  const cards = articlesGridMap(items) ?? []
  return {
    cards,
    headingTitle: ARTICLES,
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
