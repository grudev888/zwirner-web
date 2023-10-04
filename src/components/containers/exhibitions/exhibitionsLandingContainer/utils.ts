import {EXHIBITION_STATES} from '@zwirner/design-system'
import {format, isAfter, isValid, isWithinInterval, parseISO} from 'date-fns'

const isExhibitionInCity = (exhibition: any, city: string) => {
  return exhibition?.locations?.some(({address}: any) => address.city === city)
}

export const findExhibitionsByCity = (exhibitions: Array<any>, city: string) => {
  return exhibitions?.filter((exhibition) => isExhibitionInCity(exhibition, city))
}

export const isExhibitionOpen = (exhibition: any) => {
  const {startDate, endDate} = exhibition
  const startDateObj = parseISO(startDate)
  const endDateObj = parseISO(endDate)

  if (isValid(startDateObj) && isValid(endDateObj)) {
    return isWithinInterval(new Date(), {start: startDateObj, end: endDateObj})
  }
  return false
}

export const isExhibitionUpcoming = (exhibition: any) => {
  const {startDate} = exhibition
  const startDateObj = parseISO(startDate)

  return isValid(startDateObj) && isAfter(startDateObj, new Date())
}

export const isExhibitionPast = (exhibition: any) => {
  const {endDate} = exhibition
  const endDateObj = parseISO(endDate)

  // https://date-fns.org/v2.30.0/docs/isAfter
  // If current date is after end date for the exhibition
  return isValid(endDateObj) && isAfter(new Date(), endDateObj)
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

export const formatDateRange = (startDateISO: string, endDateISO: string) => {
  const startDate = parseISO(startDateISO)
  const endDate = parseISO(endDateISO)

  if (isValid(startDate) && isValid(endDate)) {
    const formattedFromDate = format(startDate, 'MMMMMM d')
    const formattedToDate = format(endDate, 'MMMMMM d, yyyy')

    return `${formattedFromDate}—${formattedToDate}`
  }
  return ''
}
