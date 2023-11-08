import {SanityClient} from 'next-sanity'

import {artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'

export async function getPressDataBySlug(client: SanityClient, slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPressPageBySlug, slug)) || []
  }
  return []
}
