import {client} from '@/sanity/client'
import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'

export async function getAvailableArtworksData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(availableArtworksData)) || []
  }
  return []
}
