import {groq} from 'next-sanity'
import {pageSEOFields} from '@/sanity/queries/seo.queries'
import {artworkFields} from '@/sanity/queries/artwork.queries'

export const availableArtworksData = groq`
*[_type == 'availableArtworks'] {
  title,
  displayNumberOfResults,
  artworks[]-> {
    ${artworkFields}
  },
  seo {
    ${pageSEOFields}
  }
}`
