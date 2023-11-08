import {type SanityClient} from 'next-sanity'

import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'

export async function getAvailableArtworksData(client: SanityClient): Promise<any[]> {
  if (client) {
    return (await client.fetch(availableArtworksData)) || []
  }
  return []
}

export async function getAvailableArtworksDataByArtistSlug(
  client: SanityClient,
  params: any
): Promise<any[]> {
  if (client) {
    const result = await client.fetch(availableArtworksDataByArtistSlug, params)
    return result || []
  }
  return []
}
