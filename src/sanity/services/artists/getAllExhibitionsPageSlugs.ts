import {client} from '@/sanity/client'
import {
  allExhibitionsPageSlugs,
  AllExhibitionsPageSlugsSchema,
} from '@/sanity/queries/artists/allExhibitionsPageSlugs'

export async function getAllExhibitionsPageSlugs() {
  const data = await client.fetch(allExhibitionsPageSlugs)
  const validatedData = AllExhibitionsPageSlugsSchema.parse(data)
  return validatedData
}
