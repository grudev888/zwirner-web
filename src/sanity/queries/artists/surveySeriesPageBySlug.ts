import {groq} from 'next-sanity'
import {z} from 'zod'

import {SanitySlugSchema} from '@/sanity/queries/components/validationPrimitives'
import {
  SeriesContentSchemaWithPageBuilder,
  seriesContentWithInnerPageBuilder,
} from '@/sanity/queries/series/seriesComplexContent'

import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'

export const surveySeriesPageBySlug = groq`
*[_type == "series" && defined(slug.current) && slug.current == $slug]{
  "seriesData": {
    title,
    seo {
      ${pageSEOFields}
    },
    ${seriesContentWithInnerPageBuilder}
  },
  "artistDetailData": *[_type == "artistPage" && defined(slug.current) && slug.current == $artistSlug && defined(surveySeries) && references(^._id)][0]{
    slug,
    title,
  }
}`

export const SurveySeriesPageBySlugSchema = z
  .array(
    z.object({
      seriesData: SeriesContentSchemaWithPageBuilder.merge(
        z.object({title: z.string(), seo: PageSEOFieldsSchema})
      ),
      artistDetailData: z.object({
        slug: SanitySlugSchema,
        title: z.string(),
      }),
    })
  )
  .nullable()
