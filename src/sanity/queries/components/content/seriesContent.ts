import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '../builders/mediaBuilder'
import {SanitySlugSchema} from '../validationPrimitives'
import {artistContent, ArtistContentSchema} from './artistContent'
import {artworkContent, ArtworkContentSchema} from './artworkContent'
import {authorContent, AuthorContentSchema} from './authorContent'
import {bookContent, BookContentSchema} from './bookContent'

export const seriesFields = groq`
   _type,
   type,
   title,
   slugTitle,
   displayDate,
   startDate,
   endDate,
   slug,
   image {
    ${mediaBuilder}
  },
   "artists": artists[]-> {
      ${artistContent}
    },
   "authors": authors[]-> {
      ${authorContent}
    },
   "artworks": artworkContent[]-> {
      ${artworkContent}
   },
   "books": books[]-> {
      ${bookContent}
   },
`

export const seriesContent = groq`
  _type == 'series' => {
    ${seriesFields}
  },
`

const TypeVariationSchema = z.nullable(z.enum(['series', 'collection']))

export const SeriesContentSchema = z.object({
  _type: z.string(),
  type: TypeVariationSchema,
  title: z.string(),
  slugTitle: z.string(),
  displayDate: z.nullable(z.string()),
  startDate: z.nullable(z.string()),
  endDate: z.nullable(z.string()),
  slug: SanitySlugSchema,
  image: z.nullable(MediaBuilderSchema),
  artists: z.nullable(z.array(ArtistContentSchema)),
  authors: z.nullable(z.array(AuthorContentSchema)),
  artworks: z.nullable(z.array(ArtworkContentSchema)),
  books: z.nullable(z.array(BookContentSchema)),
})
