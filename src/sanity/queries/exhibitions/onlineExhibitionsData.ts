import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '@/sanity/queries/components/builders/mediaBuilder'
import {artistContent, ArtistContentSchema} from '@/sanity/queries/components/content/artistContent'
import {
  dzEditorialFields,
  DzEditorialPropsDataSchema,
} from '@/sanity/queries/components/dzEditorialProps'
import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '@/sanity/queries/components/dzInterstitialProps'
import {pageSEOFields, PageSEOFieldsSchema} from '@/sanity/queries/components/seo/pageSEOFields'
import {SanitySlugSchema} from '@/sanity/queries/components/validationPrimitives'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

export const onlineExhibitionsDataBySlug = groq`
*[_type == "onlineExhibitionPage" && slug.current == $slug][0] {
  _type,
  title,
  subtitle,
  hideToggle,
  slug,
  summary,
  eyebrow,
  status,
  displayDate,
  startDate,
  endDate,
  "artists": artists[]->{${artistContent}},
  heroMedia {
    ${mediaBuilder}
  },
  ovrIntro {
    ${dzEditorialFields}
  },
  interstitial {
    ${dzInterstitialFields}
  },
  onlineExhibitionContent[] {
    ${pageBuilderComponentsData}
  },
  seo {
    ${pageSEOFields}
  },
}`

export const OnlineExhibitionsDataPropsSchema = z.object({
  slug: z.string(),
})

export type OnlineExhibitionDataPropsType = z.infer<typeof OnlineExhibitionsDataPropsSchema>

const OnlineExhibitionsStatusSchema = z.enum(['comingSoon', 'open', 'close'])

export const OnlineExhibitionsDataBySlugSchema = z.object({
  _type: z.literal('onlineExhibitionPage'),
  title: z.string(),
  subtitle: z.nullable(z.string()),
  hideToggle: z.nullable(z.boolean()),
  slug: SanitySlugSchema,
  summary: z.nullable(z.array(z.any())),
  eyebrow: z.nullable(z.string()),
  status: z.nullable(OnlineExhibitionsStatusSchema),
  displayDate: z.nullable(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  artists: z.nullable(z.array(ArtistContentSchema)),
  heroMedia: z.nullable(MediaBuilderSchema),
  ovrIntro: z.nullable(
    z.object({
      _type: z.literal('dzEditorial'),
      props: DzEditorialPropsDataSchema,
    })
  ),
  interstitial: z.nullable(
    z.object({
      _type: z.literal('dzInterstitial'),
      props: DzInterstitialPropsDataSchema,
    })
  ),
  onlineExhibitionContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
  seo: PageSEOFieldsSchema,
})

export type OnlineExhibitionsType = z.infer<typeof OnlineExhibitionsDataBySlugSchema>
