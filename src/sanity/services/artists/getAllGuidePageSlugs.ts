import {client} from '@/sanity/client'
import {
  allGuidePageSlugs,
  AllGuidePageSlugsSchema,
} from '@/sanity/queries/artists/allGuidePageSlugs'

export async function getAllGuidePageSlugs() {
  const data = await client.fetch(allGuidePageSlugs)
  const validatedData = AllGuidePageSlugsSchema.parse(data)
  return validatedData
}
