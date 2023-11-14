import {groq} from 'next-sanity'

export const allAvailableWorksPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && count(availableWorksSubpage.grid) > 0 && availableWorksSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
