import {groq} from 'next-sanity'

import {dzGridFields} from '@/sanity/queries/components/gridMoleculeProps'
import {pageBuilderComponentsData} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

import {pageSEOFields} from './components/seo/pageSEOFields'

export const availableArtworksData = groq`
*[_type == 'availableArtworks'] {
  title,
  displayNumberOfResults,
  artworksGrid {
    ${dzGridFields}
  },
  "seo": {
    title,
    ...seo {
      ${pageSEOFields}
    }
  }
}`

export const availableArtworksDataByArtistSlug = groq`
*[_type == "artistPage" && slug.current == $slug]{
  title,
  slug { current },
  artist->{fullName},
  
  availableWorksSubpage []{
    ${pageBuilderComponentsData}
  },
  "seo": {
    title,
    ...availableWorksSeo {
    ${pageSEOFields}
  },
  }
}`
