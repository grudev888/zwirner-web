import {groq} from 'next-sanity'

import {pageBuilderComponentsData} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

import {pageSEOFields} from '../components/seo/pageSEOFields'

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && defined(slug) && slug.current == $slug]{
  title,
  artist->{fullName},
  slug { current },
  surveySubpage []{
    ${pageBuilderComponentsData}
  },
  "seo": surveySeo {
    ${pageSEOFields}
  }
}`
