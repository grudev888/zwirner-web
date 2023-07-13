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

export async function getArtistPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPageBySlug, params)) || []
  }
  return []
}

export async function getAllArtistSubPageSlugs(subPageSlugName: string): Promise<any[]> {
  if (client) {
    const allArtistPageSlugs = (await client.fetch(artistPageSlugs)) || []
    return allArtistPageSlugs.map((item: any) => ({
      params: {slug: `${item.params.slug}/${subPageSlugName}`},
    }))
  }
  return []
}
