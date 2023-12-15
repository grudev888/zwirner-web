import {client} from '@/sanity/client'
import {allSurveySeriesPageSlugsSitemap} from '@/sanity/queries/sitemaps/allSurveySeriesPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllSurveySeriesSlugsSitemap() {
  const data = await client.fetch(allSurveySeriesPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
