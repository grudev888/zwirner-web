import {groq} from 'next-sanity'

export const allGuidePageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(guideSubpage) && defined(guideSeo) && guideSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
