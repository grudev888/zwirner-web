import {client} from '@/sanity/client'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworkByArtist.queries'

export async function getArtworkByArtist(slug: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artworksDataByArtistSlug, slug)) || []
  }
  return []
}
