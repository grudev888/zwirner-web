import {client} from '@/sanity/client'
import {artistExhibitionsPageData} from '@/sanity/queries/artistExhibitionsPage.queries'

interface ArtistExhibitionsPageData {
  artistFullName?: string
  exhibitions: any[]
  interstitial: any
  slug: string
}
export async function getArtistExhibitionsPageData(
  slug: string
): Promise<ArtistExhibitionsPageData> {
  if (client) {
    const data = (await client.fetch(artistExhibitionsPageData, {slug})) || []
    const artist = data[0]?.artist || {}

    return {
      artistFullName: artist.fullName,
      exhibitions: artist.exhibitions,
      interstitial: data[0]?.exhibitionsInterstitialSubpage,
      slug,
    }
  }

  return {
    artistFullName: undefined,
    exhibitions: [],
    interstitial: undefined,
    slug,
  }
}
