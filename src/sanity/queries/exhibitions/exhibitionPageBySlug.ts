import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from '../components/builders/mediaBuilder'
import {ExhibitionPageContentSchema} from '../components/content/exhibitionPageContent'
import {dzEditorialFields, DzEditorialPropsDataSchema} from '../components/dzEditorialProps'
import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '../components/dzInterstitialProps'
import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {componentsByData, ComponentsByDataScheme} from '../page/pageCommonQueries/componentsByData'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '../page/pageCommonQueries/pageBuilderComponentsData'

export const exhibitionPageBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  ...,
  artists[]->,
  locations[]->,
  'showChecklist': count(checklist.grid) > 0,
  slug,
  'checklistPDFURL': checklistPDF.asset->url,
  'pressReleasePDFURL': pdf.asset->url,
  heroMedia {
    ${mediaBuilder}
  },
  pressRelease {
    ${dzEditorialFields}
  },
  interstitial {
    ${dzInterstitialFields}
  },
  seo {
    ${pageSEOFields}
  },
  exploreContent[]{
    ${pageBuilderComponentsData}
  },
  ${componentsByData}
}`

export const ExhibitionPageBySlugPropsSchema = z.object({
  slug: z.string(),
})

export type ExhibitionPageBySlugPropsType = z.infer<typeof ExhibitionPageBySlugPropsSchema>

export const ExhibitionPageBySlugSchema = z.object({
  _id: ExhibitionPageContentSchema.shape._id,
  _createdAt: z.any(),
  _updatedAt: z.any(),
  _type: z.literal('exhibitionPage'),
  title: ExhibitionPageContentSchema.shape.title,
  subtitle: ExhibitionPageContentSchema.shape.subtitle,
  artists: ExhibitionPageContentSchema.shape.artists,
  locations: ExhibitionPageContentSchema.shape.locations,
  showChecklist: z.nullable(z.boolean()),
  slug: ExhibitionPageContentSchema.shape.slug,
  endDate: ExhibitionPageContentSchema.shape.endDate,
  startDate: ExhibitionPageContentSchema.shape.startDate,
  checklistPDFURL: z.nullable(z.string().url()),
  pressReleasePDFURL: z.nullable(z.string().url()),
  heroMedia: ExhibitionPageContentSchema.shape.heroMedia,
  pressRelease: z.nullable(
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
  seo: z.nullable(PageSEOFieldsSchema),
  exploreContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
  components: z.nullable(ComponentsByDataScheme),
})
