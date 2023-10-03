import {groq} from 'next-sanity'
import {z} from 'zod'

import {ArtistContentSchema} from './artistContent'

export const bookContent = groq`
  _type == 'book' => {
    _type,
    title,
    subtitle,
    tagline,
    publisher,
    booksUrl,
    photos,
    isbn,
    dateSelection,
    description,
    price,
    "authors": authors[]->,
    "artists": artists[]->,
  },
`
// TODO: Describe properly z.any() types
export const BookContentSchema = z.object({
  title: z.string(),
  subtitle: z.nullable(z.string()),
  tagline: z.array(z.any()),
  publisher: z.string(),
  booksUrl: z.string().url(),
  photos: z.array(z.any()),
  isbn: z.nullable(z.string()),
  dateSelection: z.nullable(z.any()),
  description: z.nullable(z.array(z.any())),
  price: z.nullable(z.number()),
  authors: z.nullable(z.array(z.any())),
  artists: z.nullable(z.array(ArtistContentSchema)),
})
