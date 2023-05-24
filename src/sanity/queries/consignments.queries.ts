import {groq} from 'next-sanity'

import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const consignmentsData = groq`
*[_type == "consignments" ] {
  ...,
  title,
  aboutText,
  body,
  footerInterstitial,
  featuredMedia,
  consignmentForm,
  interstitial,
  headerMedia,
  bodyCarousel[]->,
  seo {
    ${pageSEOFields}
  },
}`
