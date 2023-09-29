import {client} from '@/sanity/client'
import {
  exhibitionPageSlugs,
  ExhibitionPageSlugsSchema,
} from '@/sanity/queries/exhibitions/exhibitionPageSlugs'

export async function getAllExhibitionPagesSlugs() {
  const data = await client.fetch(exhibitionPageSlugs)
  const validatedData = await ExhibitionPageSlugsSchema.parse(data)
  return validatedData
}
