import {groq} from 'next-sanity'

import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artistPressPageBySlug = groq`
*[_type == "artistPage" && defined(slug.current) && slug.current == $slug][]{
  title,
  slug,
  artist->,
  pressInterstitialSubpage,
  pressSubpage {
    displayNumberOfResults,
    title,
    itemsPerRow,
    items[]->
  },
  "seo": pressSeo {
    ${pageSEOFields}
  },
}`

export const allPressPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(pressSubpage.title)][]{
  "params": { "slug": slug.current }
}`
