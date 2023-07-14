import {client} from '@/sanity/client'
import {allGuidePageSlugs, artistGuidePageBySlug} from '@/sanity/queries/artistsGuide.queries'

export async function getGuideDataBySlug(slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistGuidePageBySlug, slug)) || []
  }
  return []
}

export async function getAllGuidePages(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allGuidePageSlugs)) || []
  }
  return []
}
