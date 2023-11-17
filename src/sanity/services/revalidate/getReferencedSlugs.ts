import {client} from '@/sanity/client'
import {
  allReferencedSlugs,
  allReferencedSlugsSchema,
} from '@/sanity/queries/revalidate/allReferencedSlugs'

// TODO: add validation error handling
export async function getReferencedSlugs(_id: string) {
  const params = {id: _id}
  const data = await client.fetch(allReferencedSlugs, params)
  const validatedData = allReferencedSlugsSchema.parse(data)
  return validatedData
}
