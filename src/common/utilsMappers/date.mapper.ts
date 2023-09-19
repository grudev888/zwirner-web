import {isValid, isWithinInterval, parseISO} from 'date-fns'
import {ExhibitionPageStatus} from '@/sanity/types'
import {NOW_OPEN, COMING_SOON, NOW_CLOSED} from '@/common/constants/commonCopies'

interface DateRange {
  from: string
  to: string
}
interface DateSelectionMapperProps {
  year?: string
  dateRange?: DateRange
  approximate?: string
}
export const dateSelectionArtworkMapper = (data: DateSelectionMapperProps) => {
  if (typeof data === 'string') {
    return {
      year: new Date(data).getFullYear(),
    }
  }
  const {year, dateRange, approximate} = data ?? {}
  const {from, to} = dateRange ?? {}
  const fromYear = from ? new Date(from).getFullYear() : ''
  const toYear = to ? new Date(to).getFullYear() : ''
  const approximateParse = approximate ? new Date(approximate).getFullYear() : ''
  const approximateYear = approximateParse && !isNaN(approximateParse) ? approximateParse : ''
  const rangeYear = fromYear === toYear ? fromYear : `${fromYear} - ${toYear}`
  const selectedYear = year ?? approximateYear ?? (fromYear && toYear ? rangeYear : '')

  return {
    year: selectedYear,
  }
}

export const fromToDatesText = (from: string, to: string, includeYear: boolean = false) => {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const shareMonth = fromDate.getMonth() === toDate.getMonth()
  const parsedYear = new Date(from ?? to).getFullYear()

  const fromText = fromDate.toLocaleString('default', {month: 'long', day: 'numeric'})
  const toText = toDate.toLocaleString('default', {
    ...(shareMonth ? {} : {month: 'long'}),
    day: 'numeric',
  })
  const yearText = includeYear ? `, ${parsedYear}` : ''
  return `${fromText}—${toText}${yearText}`
}

export const mapSingleDateFormat = (dateSelection: any) => {
  if (!dateSelection) return ''
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return dateFormatter.format(new Date(dateSelection.replace(/-/g, '/')))
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

  const startDateParsed = new Date(startDate)
  const endDateParsed = new Date(endDate)
  const startDateObj = parseISO(startDate)
  const endDateObj = parseISO(endDate)
  const datesText = fromToDatesText(startDate, endDate)

  const currentDate = new Date()

  if (isValid(startDateObj) && isValid(endDateObj)) {
    const isOpen = isWithinInterval(new Date(), {start: startDateObj, end: endDateObj})
    const isComingSoon = currentDate.getTime() < startDateParsed.getTime()
    const isClosed = currentDate.getTime() > endDateParsed.getTime()

    let dateLabel = ''

    if (
      currentDate.getTime() <= endDateParsed.getTime() &&
      currentDate.getTime() >= startDateParsed.getTime()
    ) {
      dateLabel = NOW_OPEN
    } else if (currentDate.getTime() < startDateParsed.getTime()) {
      dateLabel = COMING_SOON
    } else {
      dateLabel = NOW_CLOSED
    }
    if (status) {
      switch (status) {
        case ExhibitionPageStatus.COMING_SOON:
          dateLabel = COMING_SOON
          break
        case ExhibitionPageStatus.OPEN:
          dateLabel = NOW_OPEN
          break
        case ExhibitionPageStatus.CLOSE:
          dateLabel = NOW_CLOSED
          break
        default:
          break
      }
    }
    return {
      isOpen,
      isClosed,
      isComingSoon,
      status: `${dateLabel}: ${datesText}`,
    }
  }
  return {
    isOpen: false,
    isClosed: false,
    isComingSoon: false,
    status: datesText,
  }
}
