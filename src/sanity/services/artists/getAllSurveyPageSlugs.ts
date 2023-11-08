import {client} from '@/sanity/client'
import {
  allSurveyPageSlugs,
  AllSurveyPageSlugsSchema,
} from '@/sanity/queries/artists/allSurveyPageSlugs'

export async function getAllSurveyPagesSlugs() {
  const data = await client.fetch(allSurveyPageSlugs)
  const validatedData = AllSurveyPageSlugsSchema.parse(data)
  return validatedData
}
