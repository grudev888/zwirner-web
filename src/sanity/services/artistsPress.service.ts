import {SanityClient} from 'next-sanity'

import {artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'

export async function getPressDataBySlug(client: SanityClient, slug: any): Promise<any[]> {
  return await client.fetch(artistPressPageBySlug, slug)
}
