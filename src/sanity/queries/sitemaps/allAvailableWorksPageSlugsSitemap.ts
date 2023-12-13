import {groq} from 'next-sanity'

export const allAvailableArtworksPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && count(availableWorksSubpage) > 0 && availableWorksSeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
