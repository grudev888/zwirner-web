import {client} from '@/sanity/client'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'

export async function getArtworkByArtist(artwork: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksDataByArtistSlug, artwork)) || []
  }
  return []
}
