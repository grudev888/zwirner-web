import {groq} from 'next-sanity'

export const allArtworkSlugsSitemap = groq`
*[_type =='artwork' && defined(slug) && defined(seo)] {
  "params": {
    "slug": slug.current,
    "showInSitemap": !seo.robotsNoIndex,
    "lastmod": _updatedAt
  }
}
`
