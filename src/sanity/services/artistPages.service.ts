import {client} from '@/sanity/client'
import {artistExhibitionsPageData} from '@/sanity/queries/artistExhibitionsPage.queries'

export async function getArtistExhibitionsPageData(
  slug: string
): Promise<{artistFullName?: string; exhibitions: any[]}> {
  if (client) {
    const data = (await client.fetch(artistExhibitionsPageData, {slug})) || []
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
