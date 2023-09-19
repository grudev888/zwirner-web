import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const availableArtworksData = groq`
*[_type == 'availableArtworks'] {
  title,
  displayNumberOfResults,
  artworksGrid {
    ...,
    items[]->{${artworkFields}}
  },
  seo {
    ${pageSEOFields}
  }
}`

export const availableArtworksDataByArtistSlug = groq`
*[_type == "artistPage" && slug.current == $slug]{
  title,
  slug { current },
  availableWorksSubpage {
    itemsPerRow,
    displayNumberOfResults,
    title,
    slug,
    items[]->{${artworkFields}}
  },
  "seo": availableWorksSeo {
    ${pageSEOFields}
  },
}`
