import {groq} from 'next-sanity'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const artistPressPageBySlug = groq`
*[_type == "artistPage" && defined(slug.current) && slug.current == $slug][]{
  title,
  slug,
  artist->,
  pressInterstitialSubpage {
    ...,
    image {
      ${mediaBuilder}
    }
  },
  pressSubpage {
    displayNumberOfResults,
    title,
    itemsPerRow,
    items[]-> {
      ...,
      header {
        ${mediaBuilder}
      },
    }
  },
  "seo": pressSeo {
    ${pageSEOFields}
  },
}`

export const allPressPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(pressSubpage.title)][]{
  "params": { "slug": slug.current }
}`
