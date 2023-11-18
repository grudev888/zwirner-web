import {groq} from 'next-sanity'
import {z} from 'zod'

export const allReferencedSlugs = groq`
*[!(_id in path("drafts.**")) && references($id)]{
  "slug": slug.current, 
  "type": _type,
}
`

export const allReferencedSlugsSchema = z.array(
  z.object({
    slug: z.string().nullish(),
    type: z.string(),
  })
)
