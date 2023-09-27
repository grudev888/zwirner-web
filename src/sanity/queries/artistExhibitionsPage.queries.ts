import {groq} from 'next-sanity'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const artistExhibitionsPageData = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  slug,
  artist-> {
    'exhibitions': *[_type == "exhibitionPage" && references(^._id)] | order(startDate desc) {
      ...,
      locations[]->{name}
    },
    _id,
    fullName,
  },
  exhibitionsInterstitialSubpage{
    ...,
    image {
      ${mediaBuilder}
    }
  },
  "seo": exhibitionsInterstitialSeo {
    ${pageSEOFields}
  },
}`
