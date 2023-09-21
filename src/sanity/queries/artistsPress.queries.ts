import {groq} from 'next-sanity'

import {mediaBuilder} from '@/sanity/queries/object.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

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
