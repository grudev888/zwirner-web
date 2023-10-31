import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '@/sanity/queries/components/builders/mediaBuilder'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {SanitySlugSchema} from '../components/validationPrimitives'

export const exceptionalWorksData = groq`
*[_type == "exceptionalWork" && slug.current == $slug][0] {
  _type,
  slug,
  title,
  hideToggle,
  cardViewMedia {
    ${mediaBuilder}
  },
  heroMedia {
    ${mediaBuilder}
  },
  exceptionalWorkContent[] {
    ${pageBuilderComponentsData}
  },
  seo {
    ${pageSEOFields}
  },
}`

export const ExceptionalWorksDataPropsSchema = z.object({
  slug: z.string(),
})

export type ExceptionalWorksDataPropsType = z.infer<typeof ExceptionalWorksDataPropsSchema>

export const ExceptionalWorksDataSchema = z.object({
  _type: z.literal('exceptionalWork'),
  slug: SanitySlugSchema,
  title: z.string(),
  hideToggle: z.nullable(z.boolean()),
  cardViewMedia: z.nullable(MediaBuilderSchema),
  heroMedia: z.nullable(MediaBuilderSchema),
  exceptionalWorkContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
  seo: PageSEOFieldsSchema,
})

export type ExceptionalWorksDataType = z.infer<typeof ExceptionalWorksDataSchema>
