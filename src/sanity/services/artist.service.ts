import {client} from '@/sanity/client'
import {artistById} from '@/sanity/queries/artist.queries'
import {
  artistIdAndNameBySlug,
  artistPageBySlug,
  artistPageSlugs,
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

export async function getArtistIdAndNameBySlug(slug: string): Promise<any> {
  if (client) {
    const artistPage = await client.fetch(artistIdAndNameBySlug, {slug})
    return artistPage?.[0]?.artist
  }
  return undefined
}
