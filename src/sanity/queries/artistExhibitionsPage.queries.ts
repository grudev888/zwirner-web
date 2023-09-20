import {groq} from 'next-sanity'

import {pageSEOFields} from '@/sanity/queries/seo.queries'

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
  exhibitionsInterstitialSubpage,
  "seo": exhibitionsInterstitialSeo {
    ${pageSEOFields}
  },
}`
