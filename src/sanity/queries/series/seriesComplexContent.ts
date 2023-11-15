import {groq} from 'next-sanity'
import {z} from 'zod'

import {SeriesContentSchema, seriesFields} from '@/sanity/queries/components/content/seriesContent'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

// Avoid query cycle rendering
export const seriesContentWithInnerPageBuilder = groq`
_type == 'series' => {
  ${seriesFields}
  detailContent[] {
    ${pageBuilderComponentsData}
  }
},
`

const SeriesPageBuilderSchema = z.object({
  detailContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
})

export const SeriesContentSchemaWithPageBuilder = SeriesContentSchema.merge(SeriesPageBuilderSchema)
