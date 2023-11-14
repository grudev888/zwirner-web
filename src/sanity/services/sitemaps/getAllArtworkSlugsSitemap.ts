import {client} from '@/sanity/client'
import {
  allArtworkSlugsSitemap,
  ArtworkSitemapResSchema,
} from '@/sanity/queries/sitemaps/allArtworkSlugsSitemap'

// TODO: add validation error handling
export async function getAllArtworkSlugsSitemap() {
  const data = await client.fetch(allArtworkSlugsSitemap)
  const validatedData = ArtworkSitemapResSchema.parse(data)
  return validatedData
}
