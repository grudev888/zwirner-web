import {groq} from 'next-sanity'

import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from '@/sanity/queries/components/content/exhibitionPageContent'
import {dzInterstitialFields} from '@/sanity/queries/components/dzInterstitialProps'

import {pageSEOFields} from './components/seo/pageSEOFields'

export const artistExhibitionsPageData = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  slug,
  artist-> {
    'exhibitions': *[_type == "exhibitionPage" && references(^._id)] | order(startDate desc) {
      ${exhibitionSimpleFields}
      ${exhibitionComplexFields}
    },
    _id,
    fullName,
  },
  exhibitionsInterstitialSubpage {
    ${dzInterstitialFields}
  },
  "seo": exhibitionsInterstitialSeo {
    ${pageSEOFields}
  },
}`
