import {type SanityClient} from 'next-sanity'

import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'

// TODO: add validation error handling
export async function getArtworkByArtist(client: SanityClient, artwork: any): Promise<any[]> {
  return await client.fetch(artworksDataByArtistSlug, artwork)
}
