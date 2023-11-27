import {groq} from 'next-sanity'

import {seriesContent} from '@/sanity/queries/components/content/seriesContent'
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
  surveySeries []-> {
    ${seriesContent}
  },
  "seo": {
    title,
    ...surveySeo {
      ${pageSEOFields}
    }
  }
}`
