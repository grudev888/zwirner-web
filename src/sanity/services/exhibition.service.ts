import {client} from '@/sanity/client'
import {
  allExhibitions,
  exhibitionById,
  exhibitionsByArtistSlug,
} from '@/sanity/queries/exhibition.queries'
import {exhibitionPageBySlug, exhibitionPageSlugs} from '@/sanity/queries/exhibitionPage.queries'

export async function getAllExhibitions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allExhibitions)) || []
  }
  return []
}

export async function getExhibitionById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionById, id)) || []
  }
  return []
}

export async function getAllExhibitionPagesSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionPageSlugs)) || []
  }
  return []
}

export async function getExhibitionPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionPageBySlug, params)) || []
  }
  return []
}

export async function getExhibitionsByArtistSlug(
  slug: string
): Promise<{artistFullName?: string; exhibitions: any[]}> {
  if (client) {
    const data = (await client.fetch(exhibitionsByArtistSlug, {slug})) || []
    const artist = data[0]?.artist || {}

    return {
      artistFullName: artist.fullName,
      exhibitions: artist.exhibitions,
    }
  }

  return {
    artistFullName: undefined,
    exhibitions: [],
  }
}
