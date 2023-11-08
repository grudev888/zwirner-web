import {groq} from 'next-sanity'

export const allAvailableWorksPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(availableWorksSubpage) && defined(availableWorksSeo) && availableWorksSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
