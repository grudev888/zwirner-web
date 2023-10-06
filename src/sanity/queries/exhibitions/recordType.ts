import {groq} from 'next-sanity'
import {z} from 'zod'

export const recordType = groq`
*[slug.current == $slug][0] {
  _type,
}`

const RecordTypeTypes = z.enum(['exhibitionPage', 'exceptionalWork', 'onlineExhibitionPage'])
export const RecordTypePropsSchema = z.object({
  slug: z.string(),
})

export type RecordTypePropsType = z.infer<typeof RecordTypePropsSchema>

export const RecordTypeSchema = z.object({
  _type: RecordTypeTypes,
})
