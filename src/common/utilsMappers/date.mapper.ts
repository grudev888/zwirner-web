import {endOfDay, format, isValid, parseISO, startOfDay} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'

import {COMING_SOON, NOW_OPEN} from '@/common/constants/commonCopies'
import {newYorkTimeZone} from '@/common/constants/timezone'
import {isExhibitionOpen} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {ExhibitionPageStatus} from '@/sanity/types'

interface DateRange {
  from: string
  to: string
}
interface DateSelectionMapperProps {
  year?: string
  dateRange?: DateRange
  approximate?: string
}
type StampOptions = {
  getDate?: boolean
}

export const getNewYorkTimestamp = ({getDate = false}: StampOptions): Date | string => {
  const currentTimeInNY = utcToZonedTime(new Date(), newYorkTimeZone)
  if (getDate) return currentTimeInNY
  return format(currentTimeInNY, 'EEE MMM dd yyyy HH:mm:ss zzz')
}

export const getCurrentYear = (date: string | number | Date = new Date()): number => {
  const dateInNY = utcToZonedTime(date, newYorkTimeZone)
  const currentYear = dateInNY.getFullYear()
  return currentYear
}

export const dateSelectionArtworkMapper = (data: DateSelectionMapperProps) => {
  if (typeof data === 'string') {
    return {
      year: getCurrentYear(),
    }
  }

  const {year, dateRange, approximate} = data ?? {}
  const {from, to} = dateRange ?? {}
  const fromYear = from ? getCurrentYear(from) : ''
  const toYear = to ? getCurrentYear(to) : ''
  const approximateParse = approximate ? getCurrentYear(approximate) : ''
  const approximateYear = approximateParse && !isNaN(approximateParse) ? approximateParse : ''
  const rangeYear = fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`
  const selectedYear = year ?? approximateYear ?? (fromYear && toYear ? rangeYear : '')

  return {
    year: selectedYear,
  }
}

export const fromToDatesText = (startDateISO: string, endDateISO: string): string => {
  const startDateNY = startOfDay(utcToZonedTime(parseISO(startDateISO), newYorkTimeZone))
  const endDateNY = endOfDay(utcToZonedTime(parseISO(endDateISO), newYorkTimeZone))

  const monthFormat = 'MMMM'
  const monthAndDayFormat = 'MMMM d'
  const yearFormat = 'yyyy'
  const startYear = format(startDateNY, yearFormat)
  const startMonthAndDay = format(startDateNY, monthAndDayFormat)

  const endDateFormatted =
    format(startDateNY, monthFormat) === format(endDateNY, monthFormat)
      ? format(endDateNY, 'd')
      : format(endDateNY, monthAndDayFormat)

  return `${startMonthAndDay}—${endDateFormatted}, ${startYear}`
}

export const mapSingleDateFormat = (dateSelection: string | null): string => {
  if (!dateSelection) return ''
  const dateInNY = utcToZonedTime(parseISO(dateSelection), newYorkTimeZone)
  const formattedDate = format(dateInNY, 'MMMM d, yyyy')

  return formattedDate
}

export const mapExhibitionStatus = (exhibition: any) => {
  const {startDate, endDate, displayDate, status} = exhibition ?? {}
  if (displayDate) {
    return {
      isOpen: false,
      isClosed: false,
      isComingSoon: false,
      status: displayDate,
    }
  }

  const startDateInNY = startOfDay(utcToZonedTime(parseISO(startDate), newYorkTimeZone))
  const endDateInNY = endOfDay(utcToZonedTime(parseISO(endDate), newYorkTimeZone))
  const currentTimeInNY = utcToZonedTime(new Date(), newYorkTimeZone)

  const startDateObj = parseISO(startDate)
  const endDateObj = parseISO(endDate)
  const datesText = fromToDatesText(startDate, endDate)

  if (isValid(startDateObj) && isValid(endDateObj)) {
    const isOpen = isExhibitionOpen(exhibition)
    const isComingSoon = currentTimeInNY.getTime() < startDateInNY.getTime()
    const isClosed = currentTimeInNY.getTime() > endDateInNY.getTime()

    let dateLabel = ''

    if (
      currentTimeInNY.getTime() <= endDateInNY.getTime() &&
      currentTimeInNY.getTime() >= startDateInNY.getTime()
    ) {
      dateLabel = NOW_OPEN
    } else if (currentTimeInNY.getTime() < startDateInNY.getTime()) {
      dateLabel = COMING_SOON
    }
    if (status) {
      switch (status) {
        case ExhibitionPageStatus.COMING_SOON:
          dateLabel = COMING_SOON
          break
        case ExhibitionPageStatus.OPEN:
          dateLabel = NOW_OPEN
          break
        default:
          break
      }
    }
    return {
      isOpen,
      isClosed,
      isComingSoon,
      status: `${dateLabel ? `${dateLabel}: ` : ''}${datesText}`,
    }
  }
  return {
    isOpen: false,
    isClosed: false,
    isComingSoon: false,
    status: datesText,
  }
}

export const articleDatesMapper = (date: string | null) => {
  if (!date) return null
  const currentTimeInNY = utcToZonedTime(new Date(`${date} EST`), newYorkTimeZone)
  return format(currentTimeInNY, 'MMMM d, yyyy')
}
