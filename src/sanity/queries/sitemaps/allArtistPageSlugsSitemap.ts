import {groq} from 'next-sanity'

export const allArtistPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(seo) && seo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
