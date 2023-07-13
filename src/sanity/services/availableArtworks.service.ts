import {client} from '@/sanity/client'
import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'

export async function getAvailableArtworksData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(availableArtworksData)) || []
  }
  return []
}

export async function getAvailableArtworksDataByArtistSlug(params: any): Promise<any[]> {
  if (client) {
    const result = await client.fetch(availableArtworksDataByArtistSlug, params)
    return result || []
  }
  return []
}
