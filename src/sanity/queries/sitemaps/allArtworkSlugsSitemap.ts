import {groq} from 'next-sanity'

export const allArtworkSlugsSitemap = groq`
*[_type =='artwork' && defined(slug) && defined(seo) && seo.robotsNoIndex == false] {
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}
`
