import {client} from '@/sanity/client'
import {
  allSurveySeriesPageSlugs,
  AllSurveySeriesPageSlugsSchema,
} from '@/sanity/queries/artists/allSurveySeriesPageSlugs'

export async function getAllSurveySeriesPageSlugs() {
  const data = await client.fetch(allSurveySeriesPageSlugs)
  const validatedData = AllSurveySeriesPageSlugsSchema.parse(data)
  return validatedData
}
