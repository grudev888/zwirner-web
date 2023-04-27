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
  gridMoleculeProps,
} from '@/sanity/queries/components.queries'

import {exhibitionComplexFields, exhibitionSimpleFields} from './exhibition.queries'

const pageSimpleFields = groq`
  _id,
  _type,
  slug,
  title,
`

const pageComplexFields = groq`
   exhibition-> {
     ${exhibitionSimpleFields}
     ${exhibitionComplexFields}
   },
`
const componentTypesData = groq`
  content[]-> {
    _type,
    _type =='exhibition' => {
      ${exhibitionSimpleFields}
      ${exhibitionComplexFields}
    },
    _type =='artist' => {
      ...
    },
    _type =='artwork' => {
      ...,
      "artists": artists[]->
    },
    _type == 'book' => {
      "authors": authors[]->,
      "artists": artists[]->,
    },
    _type == 'press' => {
      ...,
      "authors": authors[]->
    }
  }
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
`

export const componentsByDataScheme = groq`
  components[] {
    _type,
    title,
    ${moleculesProps}
    ${componentTypesData}
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
  ${componentsByDataScheme}
}
`
