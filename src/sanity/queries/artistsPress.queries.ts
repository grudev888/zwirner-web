import {groq} from 'next-sanity'

import {dzInterstitialFields} from '@/sanity/queries/components/dzInterstitialProps'
import {dzGridFields} from '@/sanity/queries/components/gridMoleculeProps'

import {pageSEOFields} from './components/seo/pageSEOFields'

export const artistPressPageBySlug = groq`
*[_type == "artistPage" && defined(slug.current) && slug.current == $slug][]{
  title,
  slug,
  artist->{fullName},
  pressInterstitialSubpage {
    ${dzInterstitialFields}
  },
  pressSubpage {
    ${dzGridFields}
  },
  "seo": {
    title,
    ...pressSeo {
      ${pageSEOFields}
    },
  }
}`
