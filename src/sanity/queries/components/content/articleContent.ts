import {groq} from 'next-sanity'
import {z} from 'zod'

import {artworkContent} from '@/sanity/queries/components/content/artworkContent'
import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '@/sanity/queries/components/dzInterstitialProps'

import {mediaBuilder} from '../builders/mediaBuilder'
import {pageSEOFields, PageSEOFieldsWithTitleSchema} from '../seo/pageSEOFields'
import {SanitySlugSchema} from '../validationPrimitives'

export const articleContent = groq`
  _type == 'article' => {
    _type,
    seo {
      ${pageSEOFields}
    },
    type,
    category,
    title,
    externalURL,
    primarySubtitle,
    subtitle,
    description,
    header[]{
      _type == 'headerImage' => media {
        "caption": ^.caption,
        ${mediaBuilder}
      },
      _type == 'artwork' => @-> {
        _id,
        ${artworkContent}
      },
    },
    image {
      image {
        ...
      }
    },
    publishDate,
    displayDate,
    location->,
    body,
    articles[]->,
    slug,
    interstitial {
      ${dzInterstitialFields}
    },
    pdf,
  },
`

const ArticleCategorySchema = z.enum([
  'Press',
  'News',
  'Event',
  'Museum Exhibition',
  'Museum Highlights',
])
const ArticleTypeSchema = z.enum(['internalNews', 'pressRelease', 'externalNews'])
// TODO: define type instead any
export const ArticleContentSchema = z.object({
  seo: z.nullable(PageSEOFieldsWithTitleSchema),
  type: ArticleTypeSchema,
  category: z.nullable(ArticleCategorySchema),
  title: z.string(),
  externalURL: z.nullable(z.any()),
  primarySubtitle: z.nullable(z.string()),
  subtitle: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  image: z.nullable(z.any()),
  header: z.nullable(z.array(z.any())),
  publishDate: z.nullable(z.any()),
  displayDate: z.nullable(z.string()),
  location: z.nullable(z.any()),
  body: z.nullable(z.array(z.any())),
  articles: z.nullable(z.array(z.any())),
  // TODO: refine
  slug: z.nullable(SanitySlugSchema),
  interstitial: z.nullable(
    z.object({
      _type: z.literal('dzInterstitial'),
      props: DzInterstitialPropsDataSchema,
    })
  ),
  pdf: z.nullable(z.any()),
})
