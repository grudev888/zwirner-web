import {MEDIA_ASPECT_RATIOS} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'

import {parseAvailability} from './utils'

export const mapTabsLocations = (data: any) => {
  const mappedLocationsByCity =
    data?.reduce((prev: any, loc: any) => {
      const {address, name, hours} = loc ?? {}

      const {city, state, zipCode, addressLine} = address ?? {}

      const {media} = dzMediaMapper({
        data: loc,
        ImgElement: Image,
        options: {
          aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
        },
        extraImgProps: {
          itemProp: 'image',
          property: 'image',
        },
      })

      const currentTime = new Date()

      const availability = parseAvailability(hours, currentTime)?.some(
        (time: {from: Date; to: Date}) =>
          currentTime.getTime() <= time.to.getTime() && currentTime.getTime() >= time.from.getTime()
      )

      const cardLocation = {
        media,
        title: (
          <span property="name" itemProp="name">
            {name}
          </span>
        ),
        secondaryTitle: (
          <>
            <span itemProp="streetAddress" property="streetAddress">
              {addressLine}
            </span>
            {'\n'}
            <span itemProp="addressRegion" property="addressRegion">
              {state}
            </span>
            ,{' '}
            <span itemProp="addressLocality" property="addressLocality">
              {city}
            </span>
            ,{' '}
            <span itemProp="postalCode" property="postalCode">
              {zipCode}
            </span>
          </>
        ),
        secondarySubtitle: availability ? 'Open' : 'Closed',
        property: 'address',
        typeof: 'PostalAddress',
        itemProp: 'address',
        itemScope: '',
        itemType: 'https://schema.org/PostalAddress',
      }

      if (prev[city] && prev[city].cards && Array.isArray(prev[city].cards)) {
        const cardsCopy = [...prev[city].cards]
        cardsCopy.push(cardLocation)
        prev[city].cards = cardsCopy
        return prev
      }
      prev[city] = {title: city, cards: [cardLocation]}
      return prev
    }, {}) ?? {}

  return Object.entries(mappedLocationsByCity).map((entry) => {
    const [_, locationGroup] = entry
    return locationGroup
  })
}
