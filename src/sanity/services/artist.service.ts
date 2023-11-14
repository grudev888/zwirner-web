import {type SanityClient} from 'next-sanity'

import {client} from '@/sanity/client'
import {artistById} from '@/sanity/queries/artist.queries'
import {artistPageBySlug, getAllArtistsPages} from '@/sanity/queries/artistPage.queries'

export async function getArtistById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistById, id)) || []
  }
  return []
}

export async function getArtistPageData(client: SanityClient): Promise<any[]> {
  if (client) {
    return (await client.fetch(getAllArtistsPages)) || []
  }
  return []
}

export async function getArtistPageBySlug(client: SanityClient, params: any) {
  const data = await client.fetch(artistPageBySlug, params)
  if (!data || !Object.keys(data).length) return null
  return data
}
