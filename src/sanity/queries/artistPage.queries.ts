import {groq} from 'next-sanity'

import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artistPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const artistPageBySlug = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  ...,
  _id,
  title,
  "artist": artist->,
  survey { ..., items[]-> { ..., artists[]->, } },
  latestExhibitions { ..., items[]-> { ..., exhibition->, } },
  guide { ..., items[]->, },
  selectedPress { ..., items[]->, },
  books { ..., items[]->, },
  interstitial { ... },
  seo {
    ${pageSEOFields}
  },
  slug,
}
`
