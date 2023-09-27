import {groq} from 'next-sanity'
import {z} from 'zod'

export const artistContent = groq`
  _type == 'artist' => {
    ...
  },
`

export const ArtistContentSchema = z.object({
  firstName: z.string().nullish(),
  lastName: z.string(),
  fullName: z.string(),
  summary: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  cv: z.nullable(z.any()),
  picture: z.nullable(z.any()),
  birthdate: z.nullable(z.any()),
  deathDate: z.nullable(z.any()),
  url: z.nullable(z.any()),
  photos: z.nullable(z.array(z.any())),
  biographyPicture: z.nullable(z.any()),
  social: z.nullable(z.any()),
  affiliation: z.boolean(),
  artistPage: z.nullable(z.any()),
})
