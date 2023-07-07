import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const availableArtworksData = groq`
*[_type == 'availableArtworks'] {
  title,
  displayNumberOfResults,
  artworksGrid {
    ...,
    artworks[]->{${artworkFields}}
  },
  seo {
    ${pageSEOFields}
  }
}`

export const availableArtworksDataByArtistSlug = groq`
*[_type == "artistDetail" && slug.current == $slug] {
  availableWorksSubpage {
    artwork[]->
  }
}
 `
