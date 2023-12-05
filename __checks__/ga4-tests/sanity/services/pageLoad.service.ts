import {sanityFetch} from '../../../defaults'
import {gtmPageLoadData, gtmPageLoadDataArtistPage} from '../queries/page-load.queries'
export const pageTypes = [
  'home',
  'artistListing',
  'exhibitionsLanding',
  'exhibitionsPast',
  'availableArtworks',
  // have detailed slug
  'article',
  'artistPage',
  'exhibitionPage',
]

export const getPageInfo = (type: string) => {
  let query: string
  switch (type) {
    case 'artistListing':
      query = gtmPageLoadDataArtistPage
      break

    default:
      query = gtmPageLoadData
      break
  }
  return sanityFetch(query, {type})
}
