import {client} from '@/sanity/client'
import {
  allPressPageSlugs,
  AllPressPageSlugsSchema,
} from '@/sanity/queries/artists/allPressPageSlugs'

export async function getAllPressPageSlugs() {
  const data = await client.fetch(allPressPageSlugs)
  const validatedData = AllPressPageSlugsSchema.parse(data)
  return validatedData
}
