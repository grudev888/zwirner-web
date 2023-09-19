import {ButtonVariant, EditorialType, SplitTypes, ButtonModes} from '@zwirner/design-system'

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

export enum EditorialTextTypes {
  PARAGRAPH = 'paragraph',
  QUOTE = 'quote',
}

export enum CtaActions {
  INQUIRE = 'inquire',
  ECOMM = 'ecomm',
  CUSTOM = 'custom',
  NONE = 'none',
  NEWSLETTER = 'Newsletter',
  LINK = 'Link',
  DOWNLOAD_PDF = 'Download PDF',
  LINK_CONTENT = 'Link Content',
}

export enum ArticleCategories {
  PRESS = 'Press',
  NEWS = 'News',
  EVENT = 'Event',
  EXHIBITION = 'Exhibition',
  MUSEUM_HIGHLIGHTS = 'Museum Highlights',
  MUSEUM_EXHIBITION_PRESS = 'Museum Exhibition Press',
  MUSEUM_EXHIBITION_RECORD = 'Museum Exhibition Record',
}

export enum ArticleTypes {
  INTERNAL = 'internalNews',
  PRESS = 'pressRelease',
  EXTERNAL = 'externalNews',
}

export enum PressVariation {
  SELECTED_PRESS = 'selectedPress',
  PRESS_ARTICLE = 'pressArticle',
}

export enum BookVariation {
  PRODUCT = 'productCard',
  CONTENT = 'contentCard',
}

export interface CTASchemaType {
  type: 'button' | 'link'
  action: CtaActions
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

export enum ExhibitionPageStatus {
  COMING_SOON = 'comingSoon',
  OPEN = 'open',
  CLOSE = 'close',
}

// MOLECULES

export interface DzCardSchemaProps {
  title: string
  primaryCTA?: CTASchemaType
  secondaryCTA?: CTASchemaType
  primarySubtitle?: string
  secondarySubtitle?: string
  secondaryTitle?: string
  pressVariation?: PressVariation
  bookVariation?: BookVariation
  enableOverrides: boolean
  imageOverride?: any
  additionalInformation?: any
}

export type DzCardExtendedProps = DzCardSchemaProps & {isOnGrid: boolean; cardSize: any}

export interface DzMediaSchemaProps {
  media: any
  title: string
  caption: string
}

export interface DzCarouselSchemaProps {
  title: string
  enableOverrides: boolean
}

export interface DzEditorialSchemaProps {
  title: string
  editorialType: EditorialType
  editorialTextOverrides?: TextComplexSchemaType[]
  editorialTextOverridesSimple?: any
  imageOverride?: any
  quoteTitle?: string
  quoteFootNote?: string
  reverse?: boolean
}

export interface GridMoleculeTypeProps {
  title: string
  wrap: boolean
  itemsPerRow: number
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
  mode: ButtonModes
  cta: any
  image: any
  subtitle: string
  eyebrow: string
}

export interface DzSplitTypeProps {
  title: string
  splitType: SplitTypes
  reverse: boolean
  animate: boolean
  imageOverride?: any
  enableOverrides: boolean
  primaryCTA?: CTASchemaType
}

export interface DzTitleTypeProps {
  title: string
  enableOverrides: boolean
}
