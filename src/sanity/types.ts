import {ButtonModes, ButtonVariant, EditorialType, SplitTypes} from '@zwirner/design-system'

import {PageState} from '@/store/pageStore'

export type GlobalSEOScheme = {
  _id: string
  globalSEOTitle: string | null
  globalSEODescription: string | null
  globalSEOImage: any
}

type CanonicalURL = {
  current: string
}
export type PageSEOSchema = {
  title?: string
  pageTitle?: string
  titleTemplate?: string
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

export type ArticleSchema = {
  title?: string
  images?: any
  author?: any
  publisherName?: string
  description?: string
  publisherLogo?: string
}

export type RedirectSchema = {
  from: string
  to: string
}

export type ArtistPageSchemaProps = {
  title: string
  slug: any
  seo: any
  artist: any
}

// UTILS

export type BreadcrumbItemSchema = {
  name: string
  item: string
}

export enum EditorialTextTypes {
  PARAGRAPH = 'paragraph',
  QUOTE = 'quote',
}

export enum CtaActions {
  INQUIRE = 'inquire',
  ECOMM = 'ecomm',
  CUSTOM = 'custom',
  NONE = 'none',
  SOLD_OUT = 'soldout',
  NEWSLETTER = 'Newsletter',
  LINK = 'Link',
  DOWNLOAD_PDF = 'Download PDF',
  LINK_CONTENT = 'Link Content',
  PROMO = 'promo',
}

export enum ArticleCategories {
  PRESS = 'Press',
  NEWS = 'News',
  EVENT = 'Event',
  MUSEUM_EXHIBITION = 'Museum Exhibition',
  MUSEUM_HIGHLIGHTS = 'Museum Highlights',
}

export enum ArticleTypes {
  INTERNAL = 'internalNews',
  PRESS = 'pressRelease',
  EXTERNAL = 'externalNews',
}

export enum BookVariation {
  PRODUCT = 'productCard',
  CONTENT = 'contentCard',
}

export enum MediaTypes {
  IMAGE = 'Image',
  VIDEO = 'Custom Video',
  VIDEO_RECORD = 'Video Record',
}

export type CTASchemaType = {
  type?: 'button' | 'link'
  action: CtaActions
  text: string
  link?: linkSchemaType
  variant?: ButtonVariant
}

export type TextComplexSchemaType = {
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

type SearchActionType = {
  target: string
}

export type JSONLDSchema = {
  schemaType: SchemaType
  article?: any
  breadcrumbs?: BreadcrumbItemSchema[]
  searchPotentialActions?: SearchActionType[]
  manualSchema?: any
}

export type linkSchemaType = {
  href: string
  blank: boolean
}

export enum ExhibitionPageStatus {
  COMING_SOON = 'comingSoon',
  OPEN = 'open',
  CLOSE = 'close',
}

// MOLECULES

export type DzCardSchemaProps = {
  title: string
  primaryCTA?: CTASchemaType
  secondaryCTA?: CTASchemaType
  primarySubtitle?: string
  secondarySubtitle?: string
  secondaryTitle?: string
  bookVariation?: BookVariation
  enableOverrides: boolean
  mediaOverride?: any
  additionalInformation?: any
}

export type DzCardExtendedProps = DzCardSchemaProps & {
  isOnGrid: boolean
  isSmall: boolean
  cardSize: any
  pageData: PageState
  handleLineAdd: any
}

export type DzMediaSchemaProps = {
  media: any
  title: string
}

export type DzCarouselSchemaProps = {
  title: string
  enableOverrides: boolean
}

export type DzEditorialSchemaProps = {
  title: string
  editorialType: EditorialType
  editorialTextOverrides?: TextComplexSchemaType[]
  editorialTextOverridesSimple?: any
  imageOverride?: any
  quoteTitle?: string
  quoteFootNote?: string
  reverse?: boolean
}

export type GridMoleculeTypeProps = {
  title: string
  wrap: boolean
  itemsPerRow: number
}

export type DzHeroSchemaProps = {
  title: string
  headingOverride?: string
  subHeadingOverride?: string
  secondaryTitleOverride?: string
  descriptionOverride?: string
  imageOverride?: any
  enableOverrides: boolean
}

export type DzHeroCarouselSchemaProps = {
  title: string
  headingOverride?: string
  pictures?: any
  enableOverrides: boolean
}

export type DzInterstitialTypeProps = {
  title: string
  mode: ButtonModes
  cta: any
  image: any
  subtitle: string
  eyebrow: string
}

export type DzSplitTypeProps = {
  titleOverride: string
  splitType: SplitTypes
  reverse: boolean
  media?: any
  enableOverrides: boolean
  primaryCTA?: CTASchemaType
  subtitleOverride?: string
}

export type DzSplitTypeExtendedProps = DzSplitTypeProps & {
  router?: any
}

export type DzTitleTypeProps = {
  title: string
  enableOverrides: boolean
}
