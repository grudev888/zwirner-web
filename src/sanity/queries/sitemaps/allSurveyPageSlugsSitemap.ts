import {groq} from 'next-sanity'

export const allSurveyPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(surveySubpage) && defined(surveySeo) && surveySeo.robotsNoIndex == false]{
  "params": {
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}`
