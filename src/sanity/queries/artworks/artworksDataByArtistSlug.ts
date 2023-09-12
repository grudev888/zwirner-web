import {groq} from 'next-sanity'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && defined(slug) && slug.current == $slug]{
  title,
  slug { current },
  surveySubpage {
    itemsPerRow,
    displayNumberOfResults,
    title,
    items[]->{...}
  },
  "seo": surveySeo {
    ${pageSEOFields}
  }
}`
