import {groq} from 'next-sanity'

export const allGuidePageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && count(guideSubpage.grid) > 0 && guideSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
