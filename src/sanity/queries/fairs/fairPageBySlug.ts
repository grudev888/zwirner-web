import {groq} from 'next-sanity'
import {z} from 'zod'

import {
  fairComplexFields,
  FairPageContentSchema,
  fairSimpleFields,
} from '../components/content/fairContent'
import {dzEditorialFields, DzEditorialPropsDataSchema} from '../components/dzEditorialProps'
import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '../components/dzInterstitialProps'
import {pageSEOFields, PageSEOFieldsWithTitleSchema} from '../components/seo/pageSEOFields'
import {componentsByData, ComponentsByDataScheme} from '../page/pageCommonQueries/componentsByData'
import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from '../page/pageCommonQueries/pageBuilderComponentsData'

export const fairPageBySlug = groq`
*[_type == "fairPage" && slug.current == $slug][0] {
  ${fairSimpleFields}
  ${fairComplexFields}
  "seo": {
    title,
    ...surveySeo {
      ${pageSEOFields}
    }
  },
  interstitial {
    ${dzInterstitialFields}
  },
  fairContent[]{
    ${pageBuilderComponentsData}
  },
  pressRelease {
    ${dzEditorialFields}
  },
  'pressReleasePDFURL': pdf.asset->url,
  ${componentsByData}
}`

export const FairPageBySlugPropsSchema = z.object({
  slug: z.string(),
})

export type FairPageBySlugPropsType = z.infer<typeof FairPageBySlugPropsSchema>

export const FairPageBySlugSchema = z
  .object({
    seo: PageSEOFieldsWithTitleSchema,
    interstitial: z.nullable(
      z.object({
        _type: z.literal('dzInterstitial'),
        props: DzInterstitialPropsDataSchema,
      })
    ),
    fairContent: z.nullable(z.array(PageBuilderComponentsDataSchema)),
    pressRelease: z.nullable(
      z.object({
        _type: z.literal('dzEditorial'),
        props: DzEditorialPropsDataSchema,
      })
    ),
    pressReleasePDFURL: z.nullable(z.string().url()),
    components: z.nullable(ComponentsByDataScheme),
  })
  .merge(FairPageContentSchema)

export type FairPageBySlugSchemaType = z.infer<typeof FairPageBySlugSchema>
