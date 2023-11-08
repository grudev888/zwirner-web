import {groq} from 'next-sanity'
import {z} from 'zod'

export const allExhibitionsPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)]{
  "params": {
    artist-> {
    _id,
    "refs": count(*[_type == "exhibitionPage" && references(^._id)]),
    },
    "slug": slug.current,
  }
}
[params.artist.refs > 0]
`

export const AllExhibitionsPageSlugsSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
    }),
  })
)
