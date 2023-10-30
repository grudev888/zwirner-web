import {client} from '@/sanity/client'
import {artistById} from '@/sanity/queries/artist.queries'
import {
  artistPageBySlug,
  artistPageSlugs,
  getAllArtistsPages,
} from '@/sanity/queries/artistPage.queries'

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

export async function getArtistPageData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(getAllArtistsPages)) || []
  }
  return []
}

export async function getArtistPageBySlug(params: any) {
  const data = await client.fetch(artistPageBySlug, params)
  if (!Object.keys(data).length) return null
  return data
}
