import {client} from '@/sanity/client'
import {
  allArtworkSlugs,
  artworksData,
  artworksDataByArtistSlug,
} from '@/sanity/queries/artwork.queries'

export async function getArtworkByArtist(artwork: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksDataByArtistSlug, artwork)) || []
  }
  return []
}

export async function getAllArtworkSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allArtworkSlugs)) || []
  }
  return []
}

export async function getArtworkData(slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksData, slug)) || []
  }
  return []
}
