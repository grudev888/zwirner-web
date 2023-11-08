import {groq} from 'next-sanity'

export const allPressPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(pressSubpage) && defined(pressSeo) && pressSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
