import {format, parseISO} from 'date-fns'

// accept data in ISO 8601 (UTC) format. Example: 2023-10-30T21:18:07Z
export const dateToLastmodFormat = (inputDate: string) => {
  const isISO = inputDate.includes('Z')
  if (!isISO) throw new Error('incorrect date format')
  const parsedDate = parseISO(inputDate)
  const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ssxxx")
  return formattedDate
}
