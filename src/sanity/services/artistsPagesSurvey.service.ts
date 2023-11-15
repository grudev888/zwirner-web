import {SanityClient} from 'next-sanity'

import {client} from '@/sanity/client'
import {
  allArtistsPageSurveyBySlug,
  AllArtistsPageSurveyBySlugSchema,
  seriesPageSurveyBySlug,
  SeriesPageSurveyBySlugSchema,
} from '@/sanity/queries/artistsPageSurvey'

export async function getAllArtistPageSurveySlugs() {
  const data = await client.fetch(allArtistsPageSurveyBySlug)
  const validatedData = AllArtistsPageSurveyBySlugSchema.parse(data)
  return validatedData
}

export async function getArtistPageSeriesBySlug(client: SanityClient, params: {slug: string}) {
  const data = await client.fetch(seriesPageSurveyBySlug, params)
  const validatedData = SeriesPageSurveyBySlugSchema.parse(data)
  return validatedData
}
