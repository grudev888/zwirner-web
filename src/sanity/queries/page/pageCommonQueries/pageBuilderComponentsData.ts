import {groq} from 'next-sanity'
import {z} from 'zod'

import {
  componentTypesData,
  ComponentTypesDataSchema,
  wrappedContentPerMolecule,
} from '../../components/componentTypesData'
import {dzCardProps, DzCardPropsDataSchema} from '../../components/dzCardProps'
import {dzCarouselProps, DzCarouselPropsDataSchema} from '../../components/dzCarouselProps'
import {dzEditorialProps, DzEditorialPropsDataSchema} from '../../components/dzEditorialProps'
import {
  dzHeroCarouselProps,
  DzHeroCarouselPropsDataSchema,
} from '../../components/dzHeroCarouselProps'
import {dzHeroProps, DzHeroPropsDataSchema} from '../../components/dzHeroProps'
import {
  dzInterstitialProps,
  DzInterstitialPropsDataSchema,
} from '../../components/dzInterstitialProps'
import {dzMediaProps, DzMediaPropsDataSchema} from '../../components/dzMediaProps'
import {dzSplitProps, DzSplitPropsDataSchema} from '../../components/dzSplitProps'
import {dzTitleProps, DzTitlePropsDataSchema} from '../../components/dzTitleProps'
import {DzGridMoleculePropsDataSchema, gridMoleculeProps} from '../../components/gridMoleculeProps'

export const moleculesProps = groq`
  ${gridMoleculeProps}
  ${dzCardProps}
  ${dzCarouselProps}
  ${dzEditorialProps}
  ${dzHeroProps}
  ${dzHeroCarouselProps}
  ${dzInterstitialProps}
  ${dzSplitProps}
  ${dzTitleProps}
  ${dzMediaProps}
`

export const pageBuilderComponentsData = groq`
  title,
  ${moleculesProps}
  ${componentTypesData}
  ${wrappedContentPerMolecule}
`

const PageBuilderBase = z.object({
  title: z.string().nullish(),
  content: ComponentTypesDataSchema,
})
const PageBuilderNoContent = z.object({
  title: z.string().nullish(),
  content: z.undefined().nullable(),
})

export const PageBuilderComponentsDataSchema = z.discriminatedUnion('_type', [
  PageBuilderBase.extend({_type: z.literal('dzCard')}).merge(
    z.object({props: DzCardPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzCarousel')}).merge(
    z.object({props: DzCarouselPropsDataSchema})
  ),
  PageBuilderNoContent.extend({_type: z.literal('dzEditorial')}).merge(
    z.object({props: DzEditorialPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzHero')}).merge(
    z.object({props: DzHeroPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzHeroCarousel')}).merge(
    z.object({props: DzHeroCarouselPropsDataSchema})
  ),
  PageBuilderNoContent.extend({_type: z.literal('dzInterstitial')}).merge(
    z.object({props: DzInterstitialPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzSplit')}).merge(
    z.object({props: DzSplitPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzTitle')}).merge(
    z.object({props: DzTitlePropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('dzMedia')}).merge(
    z.object({props: DzMediaPropsDataSchema})
  ),
  PageBuilderBase.extend({_type: z.literal('grid')}).merge(
    z.object({props: DzGridMoleculePropsDataSchema})
  ),
])

export type PageBuilderComponentsDataSchemaType = z.infer<typeof PageBuilderComponentsDataSchema>
