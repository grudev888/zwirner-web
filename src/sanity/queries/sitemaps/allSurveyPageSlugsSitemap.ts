import {groq} from 'next-sanity'

export const allSurveyPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && count(surveySubpage) > 0 && surveySeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
