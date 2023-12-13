import {EXHIBITION_STATES} from '@zwirner/design-system'
import {endOfDay, isAfter, isValid, isWithinInterval, parseISO, startOfDay} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'

import {newYorkTimeZone} from '@/common/constants/timezone'

const isExhibitionInCity = (exhibition: any, city: string) => {
  return exhibition?.locations?.some(({address}: any) => address.city === city)
}

export const findExhibitionsByCity = (exhibitions: Array<any>, city: string) => {
  return exhibitions?.filter((exhibition) => isExhibitionInCity(exhibition, city))
}

export const isExhibitionOpen = (exhibition: any) => {
  const {startDate, endDate, locations} = exhibition

  const startDateInNY = startOfDay(utcToZonedTime(parseISO(startDate), newYorkTimeZone))
  const endDateInNY = endOfDay(utcToZonedTime(parseISO(endDate), newYorkTimeZone))
  const currentTimeInNY = utcToZonedTime(new Date(), newYorkTimeZone)

  return locations?.some((loc: {timezone?: string}) => {
    const {timezone} = loc
    const timeZoneLoc = timezone ?? newYorkTimeZone
    const startDateInNY = startOfDay(utcToZonedTime(parseISO(startDate), timeZoneLoc))
    const endDateInNY = endOfDay(utcToZonedTime(parseISO(endDate), timeZoneLoc))
    const currentTimeInTZ = utcToZonedTime(new Date(), timeZoneLoc)

    if (isValid(startDateInNY) && isValid(endDateInNY)) {
      return isWithinInterval(currentTimeInTZ, {start: startDateInNY, end: endDateInNY})
    }
    return false
  }) ??
    (isValid(startDateInNY) && isValid(endDateInNY))
    ? isWithinInterval(currentTimeInNY, {start: startDateInNY, end: endDateInNY})
    : false
}

export const isExhibitionUpcoming = (exhibition: any) => {
  const {startDate} = exhibition
  const startDateInNY = startOfDay(utcToZonedTime(parseISO(startDate), newYorkTimeZone))
  const currentTimeInNY = utcToZonedTime(new Date(), newYorkTimeZone)

  return isValid(startDateInNY) && isAfter(startDateInNY, currentTimeInNY)
}

export const isExhibitionPast = (exhibition: any) => {
  const {endDate} = exhibition
  const endDateInNY = endOfDay(utcToZonedTime(parseISO(endDate), newYorkTimeZone))
  const currentTimeInNY = utcToZonedTime(new Date(), newYorkTimeZone)
  // https://date-fns.org/v2.30.0/docs/isAfter
  // If current date is after end date for the exhibition
  return isValid(endDateInNY) && isAfter(currentTimeInNY, endDateInNY)
}

export const getExhibitionState = (exhibition: any) => {
  if (!exhibition) {
    return
  }
  if (isExhibitionOpen(exhibition)) {
    return EXHIBITION_STATES.OPEN
  } else if (isExhibitionUpcoming(exhibition)) {
    return EXHIBITION_STATES.PRELAUNCH
  } else if (isExhibitionPast(exhibition)) {
    return EXHIBITION_STATES.POSTLAUNCH
  }
  return
}
