import {client} from '@/sanity/client'
import {homePage, pageBySlug, pageSlugs} from '@/sanity/queries/page.queries'

export async function getHomePage(): Promise<any[]> {
  if (client) {
    return (await client.fetch(homePage)) || []
  }
  return []
}

export async function getAllPageSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(pageSlugs)) || []
  }
  return []
}

export async function getPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(pageBySlug, params)) || []
  }
  return []
}
