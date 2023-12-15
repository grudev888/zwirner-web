import {SanityClient} from 'next-sanity'

import {
  surveySeriesPageBySlug,
  SurveySeriesPageBySlugSchema,
} from '@/sanity/queries/artists/surveySeriesPageBySlug'

export async function getSurveySeriesPageBySlug(client: SanityClient, params: {slug: string}) {
  const data = await client.fetch(surveySeriesPageBySlug, params)
  const validatedData = SurveySeriesPageBySlugSchema.parse(data)
  return validatedData
}
