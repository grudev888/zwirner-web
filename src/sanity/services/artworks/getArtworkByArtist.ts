import {client} from '@/sanity/client'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'

// TODO: add validation error handling
export async function getArtworkByArtist(artwork: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksDataByArtistSlug, artwork)) || []
  }
  return []
}
