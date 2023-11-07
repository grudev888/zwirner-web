import {client} from '@/sanity/client'
import {
  allArtistPageSlugs,
  AllArtistPageSlugsSchema,
} from '@/sanity/queries/artists/allArtistPageSlugs'

export async function getAllArtistPageSlugs() {
  const data = await client.fetch(allArtistPageSlugs)
  const validatedData = AllArtistPageSlugsSchema.parse(data)
  return validatedData
}
