import {client} from '@/sanity/client'
import {allArtworkSlugs, AllArtworkSlugsSchema} from '@/sanity/queries/artworks/allArtworkSlugs'

// TODO: add validation error handling
export async function getAllArtworkSlugs() {
  const data = await client.fetch(allArtworkSlugs)
  const validatedData = AllArtworkSlugsSchema.parse(data)
  return validatedData
}
