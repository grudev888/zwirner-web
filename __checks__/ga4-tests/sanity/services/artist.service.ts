import {sanityFetch} from '../../../defaults'
import {artworkHavingInquireCTAInArtistPageQuery} from '../queries/artist.queries'

export const artworkHavingInquireCTAInArtistPage = async () => {
  return (await sanityFetch(artworkHavingInquireCTAInArtistPageQuery)).find(
    (artwork: any) => artwork.artistPages.length
  )
}
