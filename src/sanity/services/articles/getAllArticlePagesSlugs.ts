import {client} from '@/sanity/client'
import {
  AllArticlePageSlugsSchema,
  allArticlePagesSlugs,
} from '@/sanity/queries/articles/allArticlePagesSlugs'

export async function getAllArticlePagesSlugs() {
  const data = await client.fetch(allArticlePagesSlugs)
  const validatedData = AllArticlePageSlugsSchema.parse(data)
  return validatedData
}
