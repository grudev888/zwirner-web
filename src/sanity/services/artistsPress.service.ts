import {SanityClient} from 'next-sanity'

import {client} from '@/sanity/client'
import {allPressPageSlugs, artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'

export async function getPressDataBySlug(client: SanityClient, slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPressPageBySlug, slug)) || []
  }
  return []
}

export async function getAllPressPages(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allPressPageSlugs)) || []
  }
  return []
}
