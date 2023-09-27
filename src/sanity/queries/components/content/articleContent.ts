import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '../builders/mediaBuilder'
import {SanitySlugSchema} from '../validationPrimitives'

export const articleContent = groq`
  _type == 'article' => {
    ...,
    header[]{
      ${mediaBuilder}
    },
    image {
      image {
        ...
      }
    },
    location->
  },
`

const ArticleCategorySchema = z.enum([
  'Press',
  'News',
  'Event',
  'Exhibition',
  'Museum Highlights',
  'Museum Exhibition Press',
  'Museum Exhibition Record',
])
const ArticleTypeSchema = z.enum(['internalNews', 'pressRelease', 'externalNews'])
// TODO: define type instead any
export const ArticleContentSchema = z.object({
  seo: z.nullable(z.any()),
  type: ArticleTypeSchema,
  category: z.nullable(ArticleCategorySchema),
  title: z.string(),
  externalURL: z.nullable(z.any()),
  primarySubtitle: z.nullable(z.string()),
  subtitle: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  image: z.nullable(z.any()),
  header: z.nullable(MediaBuilderSchema),
  publishDate: z.nullable(z.any()),
  displayDate: z.nullable(z.string()),
  location: z.nullable(z.any()),
  body: z.nullable(z.array(z.any())),
  articles: z.nullable(z.array(z.any())),
  // TODO: refine
  slug: z.nullable(SanitySlugSchema),
  interstitial: z.nullable(z.any()),
  pdf: z.nullable(z.any()),
})
