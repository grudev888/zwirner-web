import {groq} from 'next-sanity'
import {z} from 'zod'

// Thomas ruff will render surveySeries as a list of series items, so check the length
// Artists survey subpage support a list of page builder items, so check the length
export const allSurveyPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && (count(surveySubpage) > 0 || count(surveySeries) > 0)]{
  "params": {
    "slug": slug.current
  }
}`

export const AllSurveyPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
