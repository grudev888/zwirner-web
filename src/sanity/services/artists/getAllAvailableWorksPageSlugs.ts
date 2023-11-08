import {client} from '@/sanity/client'
import {
  allAvailableWorksPageSlugs,
  AllAvailableWorksPageSlugsSchema,
} from '@/sanity/queries/artists/allAvailableWorksPageSlugs'

export async function getAllAvailableWorksPageSlugs() {
  const data = await client.fetch(allAvailableWorksPageSlugs)
  const validatedData = AllAvailableWorksPageSlugsSchema.parse(data)
  return validatedData
}
