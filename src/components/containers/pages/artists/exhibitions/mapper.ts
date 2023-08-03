import {CARD_TYPES, MEDIA_ASPECT_RATIOS} from '@zwirner/design-system'
import {format, isAfter, isValid, isWithinInterval, parse} from 'date-fns'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

export const mapCardsGrid = (data: any[]) => {
  if (!data) {
    return []
  }
  return data.map((exhibitionPageData) => {
    const {_id, title, subtitle, startDate, endDate, locations, displayDate} = exhibitionPageData
    const {media, hideImage} = dzMediaMapper({
      data: exhibitionPageData,
      ImgElement: Image,
      options: {aspectRatio: MEDIA_ASPECT_RATIOS['16:9']},
    })

    const locationsTitle = locations?.map(({name}: {name: string}) => name).join(',')
    let exhibitionDateTitle = displayDate

    if (!displayDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const exStartDate = parse(startDate, 'yyyy-MM-dd', new Date())
      const exEndDate = parse(endDate, 'yyyy-MM-dd', new Date())
      const dateNow = new Date()
      let datePrefix = 'Upcoming: '

      if (isWithinInterval(dateNow, {start: exStartDate, end: exEndDate})) {
        datePrefix = 'Now Open: '
      } else if (isAfter(dateNow, exEndDate)) {
        datePrefix = ''
      }
      const formattedFromDate = format(exStartDate, 'MMMMMM d')
      const formattedToDate = format(exEndDate, 'MMMMMM d, yyyy')
      exhibitionDateTitle = `${datePrefix}${formattedFromDate}-${formattedToDate}`
    }

    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      media,
      hideImage,
      title,
      subtitle,
      secondaryTitle: locationsTitle,
      secondarySubtitle: exhibitionDateTitle,
    }
  })
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}

  if (!title && !text) return null

  const {media} = dzMediaMapper({data, ImgElement: Image})

  return {
    data: {
      split: false,
      mode: data.mode,
      title,
      primaryCta: {text},
      ...(data.image?.asset && {
        media,
      }),
    },
  }
}
