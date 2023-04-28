import {client} from '@/sanity/client'
import {artistById} from '@/sanity/queries/artist.queries'
import {artistPageBySlug, artistPageSlugs} from '@/sanity/queries/artistPage.queries'

export async function getArtistById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistById, id)) || []
  }
  return []
}

export async function getAllArtistPageSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPageSlugs)) || []
  }
  return []
}

export async function getArtistPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPageBySlug, params)) || []
  }
  return []
}
