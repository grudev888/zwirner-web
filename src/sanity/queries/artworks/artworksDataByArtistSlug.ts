import {groq} from 'next-sanity'

import {dzGridFields} from '../components/gridMoleculeProps'
import {pageSEOFields} from '../components/seo/pageSEOFields'

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && defined(slug) && slug.current == $slug]{
  title,
  artist->{fullName},
  slug { current },
  surveySubpage {
    ${dzGridFields}
  },
  "seo": surveySeo {
    ${pageSEOFields}
  }
}`
