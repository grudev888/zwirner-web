import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder} from '../components/builders/mediaBuilder'
import {
  ExhibitionPageContentSchema,
  exhibitionSimpleFields,
  ExhibitionSimpleFieldsSchema,
} from '../components/content/exhibitionPageContent'
import {dzEditorialFields} from '../components/dzEditorialProps'
import {dzInterstitialFields} from '../components/dzInterstitialProps'
import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {componentsByData, ComponentsByDataScheme} from '../page/pageCommonQueries/componentsByData'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '../page/pageCommonQueries/pageBuilderComponentsData'

export const exhibitionPageBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  ...,
  ${exhibitionSimpleFields}
  artists[]->,
  locations[]->,
  heroMedia {
    ${mediaBuilder}
  },
  'showChecklist': count(checklist.grid) > 0,
  'checklistPDFURL': checklistPDF.asset->url,
  'pressReleasePDFURL': pdf.asset->url,
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

export const ExhibitionPageBySlugSchema = z
  .object({
    heroMedia: ExhibitionPageContentSchema.shape.heroMedia,
    artists: ExhibitionPageContentSchema.shape.artists,
    locations: ExhibitionPageContentSchema.shape.locations,
    pressRelease: PageBuilderComponentsDataSchema,
    interstitial: PageBuilderComponentsDataSchema,
    seo: PageSEOFieldsSchema,
    exploreContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
    components: z.nullable(ComponentsByDataScheme),
    showChecklist: z.nullable(z.boolean()),
    checklistPDFURL: z.nullable(z.string().url()),
    pressReleasePDFURL: z.nullable(z.string().url()),
  })
  .merge(ExhibitionSimpleFieldsSchema)

export type ExhibitionPageBySlugType = z.infer<typeof ExhibitionPageBySlugSchema>
