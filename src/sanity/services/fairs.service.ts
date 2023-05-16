import {client} from '@/sanity/client'
import {fairPageBySlug,fairPageSlugs} from '@/sanity/queries/fairPage.queries'

export async function getAllFairPagesSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(fairPageSlugs)) || []
  }
  return []
}

export async function getFairPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(fairPageBySlug, params)) || []
  }
  return []
}
