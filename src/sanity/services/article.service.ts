import {client} from '@/sanity/client'
import {articleBySlug, articlePagesSlugs} from '@/sanity/queries/article.queries'

export async function getAllArticlePages(): Promise<any[]> {
  if (client) {
    return (await client.fetch(articlePagesSlugs)) || []
  }
  return []
}

export async function getArticlePageBySlug(params: any): Promise<any[]> {
  if (client) {
    return await client.fetch(articleBySlug, params)
  }
  return []
}
