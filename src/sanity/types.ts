import {ButtonVariant, EditorialType, SplitTypes} from '@zwirner/design-system'

export interface GlobalSEOScheme {
  _id: string
  globalSEOTitle: string
  globalSEODescription: string
  globalSEOImage: any
}

type CanonicalURL = {
  current: string
}
export interface PageSEOSchema {
  pageTitle?: string
  metaDescription?: string
  h1Header?: string
  canonicalURL?: CanonicalURL
  robotsNoIndex?: boolean
  robotsNoFollow?: boolean
  imageMeta?: any
  socialTitle?: string
  socialDescription?: string
  jsonLD?: JSONLDSchema
}

export interface ArticleSchema {
  title?: string
  images?: any
  author?: any
  publisherName?: string
  description?: string
  publisherLogo?: string
}

export interface RedirectSchema {
  from: string
  to: string
}

export interface ArtistPageSchemaProps {
  title: string
  slug: any
  seo: any
  artist: any
}

// UTILS

export interface BreadcrumbItemSchema {
  name: string
  item: string
}

export interface CTASchemaType {
  type: 'button' | 'link'
  text: string
  link?: linkSchemaType
  variant?: ButtonVariant
}

export interface TextComplexSchemaType {
  text: string
  textType: any
}

export const SCHEMA_TYPE_JSON_LD = {
  ARTICLE: 'article',
  BREADCRUMB: 'breadcrumb',
  BLOG: 'blog',
  SITELINKS: 'sitelinks',
  MANUAL: 'manual',
}
export const JSON_LD_SCHEMA_TYPE_NAMES = [
  SCHEMA_TYPE_JSON_LD.ARTICLE,
  SCHEMA_TYPE_JSON_LD.BREADCRUMB,
  SCHEMA_TYPE_JSON_LD.BLOG,
  SCHEMA_TYPE_JSON_LD.SITELINKS,
  SCHEMA_TYPE_JSON_LD.MANUAL,
] as const

type SchemaType = (typeof JSON_LD_SCHEMA_TYPE_NAMES)[number]

interface SearchActionType {
  target: string
}

export interface JSONLDSchema {
  schemaType: SchemaType
  article?: any
  breadcrumbs?: BreadcrumbItemSchema[]
  searchPotentialActions?: SearchActionType[]
  manualSchema?: any
}

interface externalLinkType {
  href: string
  blank: boolean
}

export interface linkSchemaType {
  externalLink?: externalLinkType
  internalLink?: string
}

// MOLECULES

export interface DzCardSchemaProps {
  title: string
  image?: any
  primaryCTA?: CTASchemaType
  secondaryCTA?: CTASchemaType
  enableOverrides: boolean
  imageOverride?: any
}

export interface DzCarouselSchemaProps {
  title: string
  enableOverrides: boolean
}

export interface DzEditorialSchemaProps {
  title: string
  editorialType: EditorialType
  editorialTextOverrides?: TextComplexSchemaType[]
  imageOverride?: any
  enableOverrides: boolean
}

export interface DzHeroSchemaProps {
  title: string
  headingOverride?: string
  subHeadingOverride?: string
  secondaryTitleOverride?: string
  descriptionOverride?: string
  imageOverride?: any
  enableOverrides: boolean
}

export interface DzHeroCarouselSchemaProps {
  title: string
  headingOverride?: string
  pictures?: any
  enableOverrides: boolean
}

export interface DzInterstitialTypeProps {
  title: string
  split: boolean
  imageOverride?: any
  enableOverrides: boolean
}

export interface DzSplitTypeProps {
  title: string
  splitType: SplitTypes
  reverse: boolean
  animate: boolean
  imageOverride?: any
  enableOverrides: boolean
}

export interface DzTitleTypeProps {
  title: string
  enableOverrides: boolean
}

export enum ArticleTypes {
  INTERNAL = 'internalNews',
  PRESS = 'pressRelease',
  EXTERNAL = 'externalNews',
}
