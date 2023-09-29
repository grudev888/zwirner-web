import {groq} from 'next-sanity'
import {z} from 'zod'

export const artistContent = groq`
  _type == 'artist' => {
    ...,
    _type,
    firstName,
    lastName,
    fullName,
    summary,
    description,
    cv,
    picture,
    birthdate,
    deathDate,
    url,
    photos,
    biographyPicture,
    social,
    affiliation,
    artistPage,
  },
`

export const ArtistContentSchema = z.object({
  _type: z.literal('artist'),
  firstName: z.string().nullish(),
  lastName: z.string(),
  fullName: z.string(),
  summary: z.string().nullish(),
  description: z.array(z.any()).nullish(),
  cv: z.nullable(z.any()),
  picture: z.nullable(z.any()),
  birthdate: z.nullable(z.any()),
  deathDate: z.nullable(z.any()),
  url: z.nullable(z.any()),
  photos: z.array(z.any()).nullish(),
  biographyPicture: z.nullable(z.any()),
  social: z.nullable(z.any()),
  affiliation: z.boolean(),
  artistPage: z.nullable(z.any()),
})
