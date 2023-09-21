import {groq} from 'next-sanity'

import {mediaBuilder} from '@/sanity/queries/object.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const consignmentsData = groq`
*[_type == "consignments" ] {
  ...,
  title,
  aboutText,
  body,
  footerInterstitial {
    ...,
    image{${mediaBuilder}},
  },
  featuredMedia,
  consignmentForm,
  interstitial{
    ...,
    image{${mediaBuilder}},
  },
  headerMedia,
  bodyCarousel{
    ...,
    items[]->,
  },
  seo {
    ${pageSEOFields}
  },
}`
