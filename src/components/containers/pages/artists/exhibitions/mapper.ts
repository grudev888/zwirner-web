import {CARD_TYPES, MEDIA_TYPES} from '@zwirner/design-system'
import {format, isAfter, isValid, isWithinInterval, parse} from 'date-fns'
import Image from 'next/image'

import {builder} from '@/sanity/imageBuilder'

export const mapCardsGrid = (data: any[]) => {
  if (!data) {
    return []
  }
  return data.map((exhibitionPageData) => {
    const {_id, photos, title, subtitle, startDate, endDate, locations, displayDate} =
      exhibitionPageData
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    const locationsTitle = locations?.map(({name}: {name: string}) => name).join(',')
    let exhibitionDateTitle = displayDate

    if (!displayDate && isValid(new Date(startDate)) && isValid(new Date(endDate))) {
      const exStartDate = parse(startDate, 'yyyy-MM-dd', new Date())
      const exEndDate = parse(endDate, 'yyyy-MM-dd', new Date())
      const dateNow = new Date()
      let datePrefix = 'Upcoming'

      if (isWithinInterval(dateNow, {start: exStartDate, end: exEndDate})) {
        datePrefix = 'Now Open'
      } else if (isAfter(dateNow, exEndDate)) {
        datePrefix = 'Past'
      }
      const formattedFromDate = format(exStartDate, 'MMMMMM d')
      const formattedToDate = format(exEndDate, 'MMMMMM d, yyyy')
      exhibitionDateTitle = `${datePrefix}: ${formattedFromDate}-${formattedToDate}`
    }

    return {
      cardType: CARD_TYPES.CONTENT,
      id: _id,
      media: {
        type: MEDIA_TYPES.IMAGE,
        ImgElement: Image,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
      },
      title,
      subtitle,
      secondaryTitle: locationsTitle,
      secondarySubtitle: exhibitionDateTitle,
    }
  })
}
