import {SanityClient} from 'next-sanity'

import {artistGuidePageBySlug} from '@/sanity/queries/artistsGuide.queries'

export async function getGuideDataBySlug(client: SanityClient, slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistGuidePageBySlug, slug)) || []
  }
  return []
}
