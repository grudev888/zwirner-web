import {client} from '@/sanity/client'
import {
  articleBySlug,
  articlePagesSlugs,
  pressBySlug,
  pressPagesSlugs,
} from '@/sanity/queries/article.queries'

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

export async function getAllPressPages(): Promise<any[]> {
  if (client) {
    return (await client.fetch(pressPagesSlugs)) || []
  }
  return []
}

export async function getPressPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return await client.fetch(pressBySlug, params)
  }
  return []
}
