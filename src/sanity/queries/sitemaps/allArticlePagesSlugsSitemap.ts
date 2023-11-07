import {groq} from 'next-sanity'

// Fetch all pages with body content available and slug. retrieve the url
export const allArticlePagesSlugsSitemap = groq`
*[_type == "article" && defined(slug.current) && defined(body) && defined(seo)][]{
  "params": {
    "slug": slug.current,
    "showInSitemap": !seo.robotsNoIndex,
    "lastmod": _updatedAt
  }
}`
