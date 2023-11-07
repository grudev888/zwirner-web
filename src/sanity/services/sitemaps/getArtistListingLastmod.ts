import {client} from '@/sanity/client'
import {artistListingLastmod} from '@/sanity/queries/sitemaps/artistListingLastmod'
import {SitemapResSchema} from '@/sanity/queries/sitemaps/typesData'

export async function getArtistListingLastmod() {
  const data = await client.fetch(artistListingLastmod)
  const validatedData = SitemapResSchema.parse(data)
  return validatedData
}
