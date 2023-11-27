import {groq} from 'next-sanity'
import {z} from 'zod'

import {ExhibitionPageContentSchema} from '../components/content/exhibitionPageContent'
import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '../components/dzInterstitialProps'
import {dzGridFields, DzGridMoleculePropsDataSchema} from '../components/gridMoleculeProps'
import {pageSEOFields, PageSEOFieldsSchema} from '../components/seo/pageSEOFields'
import {SanitySlugSchema} from '../components/validationPrimitives'

export const installationViewsBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  title,
  subtitle,
  startDate,
  endDate,
  displayDate,
  locations[]->,
  'showChecklist': count(checklist.grid) > 0,
  'showInstallationViews': count(installationViews.grid) > 0,
  slug,
  installationViewsInterstitial {
    ${dzInterstitialFields}
  },
  installationViews {
    ${dzGridFields}
  },
  'seo': installationViewsSeo {
    ${pageSEOFields}
  }
}`

export const InstallationViewsBySlugPropsSchema = z.object({
  slug: z.string(),
})

export type InstallationViewsBySlugPropsType = z.infer<typeof InstallationViewsBySlugPropsSchema>

export const InstallationViewsBySlugSchema = z.object({
  title: z.string(),
  subtitle: z.nullable(z.string()),
  locations: ExhibitionPageContentSchema.shape.locations,
  displayDate: z.nullable(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  showChecklist: z.nullable(z.boolean()),
  showInstallationViews: z.nullable(z.boolean()),
  slug: SanitySlugSchema,
  installationViewsInterstitial: z.nullable(
    z.object({
      _type: z.literal('dzInterstitial'),
      props: DzInterstitialPropsDataSchema,
    })
  ),
  installationViews: z.nullable(
    z.object({
      _type: z.literal('grid'),
      props: DzGridMoleculePropsDataSchema,
    })
  ),
  seo: z.nullable(PageSEOFieldsSchema),
})
