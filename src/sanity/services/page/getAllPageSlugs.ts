import {client} from '@/sanity/client'
import {pageSlugs, PageSlugsSchema} from '@/sanity/queries/page/pageSlugs'

// TODO: add validation error handling
export async function getAllPageSlugs() {
  const data = await client.fetch(pageSlugs)
  const validatedData = PageSlugsSchema.parse(data)
  return validatedData
}
