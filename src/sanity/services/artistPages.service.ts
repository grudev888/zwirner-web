import {SanityClient} from 'next-sanity'

import {artistExhibitionsPageData} from '@/sanity/queries/artistExhibitionsPage.queries'

interface ArtistExhibitionsPageData {
  slug: {current: string}
  artist?: {fullName: string; exhibitions: any[]}
  exhibitionsInterstitialSubpage?: any
}

export async function getArtistExhibitionsPageData(
  client: SanityClient,
  slug: string
): Promise<ArtistExhibitionsPageData> {
  if (client) {
    return await client.fetch(artistExhibitionsPageData, {slug})
  }

  return {slug: {current: slug}}
}
