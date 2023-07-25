import {client} from '@/sanity/client'
import {artworksDataByArtistSlug, allArtworks, artworksData} from '@/sanity/queries/artworkByArtist.queries'

export async function getArtworkByArtist(artwork: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksDataByArtistSlug, artwork)) || []
  }
  return []
}


export async function getAllArtworks(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allArtworks)) || []
  }
  return []
}


export async function getArtworkData(slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksData, slug)) || []
  }
  return []
}
