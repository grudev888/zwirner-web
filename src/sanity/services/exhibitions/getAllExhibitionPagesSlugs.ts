import {client} from '@/sanity/client'
import {
  ExhibitionPageBySlugsSchema,
  exhibitionPageSlugs,
} from '@/sanity/queries/exhibitions/exhibitionPageSlugs'

export async function getAllExhibitionPagesSlugs() {
  const data = await client.fetch(exhibitionPageSlugs)
  const validatedData = await ExhibitionPageBySlugsSchema.parse(data)
  return validatedData
}
