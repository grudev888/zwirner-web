import {groq} from 'next-sanity'

export const allPressPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && count(pressSubpage.grid) > 0 && pressSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
