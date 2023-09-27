import {groq} from 'next-sanity'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {pageSEOFields} from './components/seo/pageSEOFields'

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
