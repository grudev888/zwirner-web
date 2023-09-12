import {groq} from 'next-sanity'

import {
  dzCardProps,
  dzCarouselProps,
  dzEditorialProps,
  dzHeroCarouselProps,
  dzHeroProps,
  dzInterstitialProps,
  dzSplitProps,
  dzTitleProps,
  dzMediaProps,
  gridMoleculeProps,
  componentTypesData,
} from '@/sanity/queries/components.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

const pageSimpleFields = groq`
  _id,
  _type,
  slug,
  title,
`

const pageComplexFields = groq`
   exhibitionPage-> {
     ${exhibitionSimpleFields}
     ${exhibitionComplexFields}
   },
`

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
  _type,
  title,
  ${moleculesProps}
  ${componentTypesData}
`
export const componentsByDataScheme = groq`
  components[] {
    ${pageBuilderComponentsData}
  },
`

export const pageSlugs = groq`*[_type == "page" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const pageBySlug = groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageSimpleFields}
  ${pageComplexFields}
}`

export const homePage = groq`
*[_type == "home"] {
  _id,
  _type,
  title,
  seo {
    ${pageSEOFields}
  },
  ${componentsByDataScheme}
}
`
