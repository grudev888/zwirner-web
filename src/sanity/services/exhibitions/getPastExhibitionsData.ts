import {client} from '@/sanity/client'
import {
  ALL_YEARS,
  allPastExhibitionYears,
  AllPastExhibitionYearsSchema,
  getPastExhibitionsQueryByYear,
  PastExhibitionsFilteredSchema,
  pastExhibitionsPageData,
  PastExhibitionsPageDataSchema,
  YearType,
} from '@/sanity/queries/exhibitions/pastExhibitionsData'

export const EXHIBITIONS_PER_PAGE = 15

export type PastExhibitionsByYearProps = {
  year?: YearType
  initialPage?: number
  endPage?: number
}
export async function getPastExhibitionsPageData() {
  const data = await client.fetch(pastExhibitionsPageData)
  if (!data) return null
  const validatedData = PastExhibitionsPageDataSchema.parse(data)
  return validatedData
}

export async function getAllPastExhibitionYears() {
  const data = await client.fetch(allPastExhibitionYears)
  if (!data) return null
  const validatedData = AllPastExhibitionYearsSchema.parse(data)
  return validatedData
}

export const parseParamsForPastExhibitions = ({
  year,
  initialPage,
  endPage,
}: PastExhibitionsByYearProps) => {
  const parsedYear = year ?? ALL_YEARS
  const initialPageChunk = initialPage ?? 0
  const finalPageChunk =
    initialPageChunk > 1 ? initialPageChunk * EXHIBITIONS_PER_PAGE : EXHIBITIONS_PER_PAGE
  return {
    year: parsedYear,
    initialPage: initialPageChunk > 1 ? (initialPageChunk - 1) * EXHIBITIONS_PER_PAGE : 0,
    endPage: endPage ?? finalPageChunk,
  }
}

export async function getPastExhibitionsByYear({
  year,
  initialPage,
  endPage,
}: PastExhibitionsByYearProps) {
  const params = parseParamsForPastExhibitions({
    year,
    initialPage,
    endPage,
  })

  const data = await client.fetch(getPastExhibitionsQueryByYear(params.year), params)
  if (!data) return null
  const validatedData = PastExhibitionsFilteredSchema.parse(data)
  return validatedData
}
