import {groq} from 'next-sanity'

export const allArtistPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(seo)][]{
  "params": {
    "slug": slug.current,
    "showInSitemap": !seo.robotsNoIndex,
    "lastmod": _updatedAt
  }
}`
