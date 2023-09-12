import {z} from 'zod'

import {client} from '@/sanity/client'
import {allArtworkSlugs} from '@/sanity/queries/artworks/allArtworkSlugs'

const AllArtworkSlugsSchema = z.array(z.string())

export async function getAllArtworkSlugs() {
  const data = await client.fetch(allArtworkSlugs)
  const validatedData = AllArtworkSlugsSchema.parse(data)
  return validatedData
}
