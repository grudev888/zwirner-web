import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'
import {dzGridFields} from '@/sanity/queries/components/gridMoleculeProps'

import {pageSEOFields} from './components/seo/pageSEOFields'

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
  artist->{fullName},
  availableWorksSubpage{
   ${dzGridFields}
  },
  "seo": availableWorksSeo {
    ${pageSEOFields}
  },
}`
