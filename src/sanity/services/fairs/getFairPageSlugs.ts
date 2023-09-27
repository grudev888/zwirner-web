import {client} from '@/sanity/client'
import {fairPageSlugs, FairPageSlugsSchema} from '@/sanity/queries/fairs/fairPageSlugs'

export async function getAllFairPageSlugs() {
  const data = await client.fetch(fairPageSlugs)
  const validatedData = await FairPageSlugsSchema.parse(data)
  return validatedData
}
