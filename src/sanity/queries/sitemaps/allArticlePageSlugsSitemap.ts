import {groq} from 'next-sanity'

// Fetch all pages with body content available and slug. retrieve the url
export const allArticlePageSlugsSitemap = groq`
*[_type == "article" && defined(slug.current) && defined(body) && defined(seo) && seo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
