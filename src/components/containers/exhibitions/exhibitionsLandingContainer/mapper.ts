import {format, isValid, parse} from 'date-fns'
import Image from 'next/image'

import {EXHIBITION, LEARN_MORE_AMP_SUBSCRIBE} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {formatDateRange} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {ArticleTypes} from '@/sanity/types'

const formatExhibitionDate = (startDate: string, endDate: string) => {
  const exStartDate = parse(startDate, 'yyyy-MM-dd', new Date())
  const exEndDate = parse(endDate, 'yyyy-MM-dd', new Date())

  if (isValid(exStartDate) && isValid(exEndDate)) {
    const formattedFromDate = format(exStartDate, 'MMMMMM d')
    const formattedToDate = format(exEndDate, 'MMMMMM d, yyyy')

    return `${formattedFromDate}—${formattedToDate}`
  }
  return ''
}

export const exhibitionCarouselMapper = (exhibitions: any[]) => {
  return exhibitions?.map((exhibitionPage) => {
    const {_id, title, summary, locations, startDate, endDate, heroMedia, slug} =
      exhibitionPage ?? {}
    const secondaryTitle = locations?.[0]?.name
    const secondarySubtitle = formatExhibitionDate(startDate, endDate)
    const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
    const {media} = dzMediaMapper({data: heroMediaSource ?? exhibitionPage, ImgElement: Image})
    const summaryText = safeText({key: 'description', text: summary})

    return {
      id: _id,
      media,
      category: EXHIBITION,
      title,
      secondaryTitle,
      secondarySubtitle,
      ...summaryText,
      linkCTA: {
        text: LEARN_MORE_AMP_SUBSCRIBE,
        url: slug?.current,
      },
    }
  })
}

export const mapHighlightCards = (cardsData: Array<any>) => {
  return cardsData.map((data: any) => {
    const {dateSelection, displayDate, description, externalURL, subtitle, slug, title, type} =
      data ?? {}
    const {dateRange, year} = dateSelection ?? {}
    const articleLink = type === ArticleTypes.EXTERNAL ? externalURL : slug?.current
    const descriptionText = safeText({key: 'description', text: description})
    let dateText = ''

    if (displayDate) {
      dateText = displayDate
    } else if (dateRange) {
      const {from, to} = dateSelection.dateRange
      dateText = formatDateRange(from, to)
    } else if (year) {
      dateText = year
    }

    return {
      ...descriptionText,
      title,
      category: null,
      subtitle: null,
      secondaryTitle: subtitle,
      secondarySubtitle: dateText,
      cardLink: {
        href: articleLink,
      },
      linkCTA: {
        text: 'Learn More',
        url: articleLink,
      },
    }
  })
}
