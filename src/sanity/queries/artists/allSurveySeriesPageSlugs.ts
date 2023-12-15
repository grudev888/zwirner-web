import {groq} from 'next-sanity'
import {z} from 'zod'

export const allSurveySeriesPageSlugsBaseQuery = groq`
*[_type == "artistPage" && defined(slug.current) && defined(surveySeries)]
`

export const allSurveySeriesPageSlugs = groq`
${allSurveySeriesPageSlugsBaseQuery}{
  "surveySeriesSlugs": surveySeries[]->{
    "params": {
      "slug": slug.current
    }
  }
}`

export const AllSurveySeriesPageSlugsSchema = z.array(
  z.object({
    surveySeriesSlugs: z
      .array(
        z.object({
          params: z.object({
            slug: z.string(),
          }),
        })
      )
      .nullable(),
  })
)
