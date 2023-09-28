import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageComplexFields, PageComplexFieldsSchema} from './pageCommonQueries/pageComplexFields'
import {pageSimpleFields, PageSimpleFieldsSchema} from './pageCommonQueries/pageSimpleFields'

// UNUSED
export const pageBySlug = groq`
*[_type == "page" && defined(slug.current) && slug.current == $slug][0] {
  ${pageSimpleFields}
  ${pageComplexFields}
}`

export const PageBySlugPropsSchema = z.object({
  slug: z.string(),
})

export type PageBySlugPropsType = z.infer<typeof PageBySlugPropsSchema>

export const PageBySlugSchema = PageSimpleFieldsSchema.merge(PageComplexFieldsSchema)
export type PageBySlugType = z.infer<typeof PageBySlugSchema>
