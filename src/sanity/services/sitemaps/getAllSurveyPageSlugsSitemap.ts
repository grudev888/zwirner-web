import {client} from '@/sanity/client'
import {allSurveyPageSlugsSitemap} from '@/sanity/queries/sitemaps/allSurveyPageSlugsSitemap'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getAllSurveyPageSlugsSitemap() {
  const data = await client.fetch(allSurveyPageSlugsSitemap)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
