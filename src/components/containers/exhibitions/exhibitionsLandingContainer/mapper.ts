import {fromToDatesText} from '@/common/utilsMappers/date.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {ArticleTypes} from '@/sanity/types'

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
      dateText = fromToDatesText(from, to)
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
