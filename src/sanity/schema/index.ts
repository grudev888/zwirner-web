import {type DocumentDefinition, type ObjectDefinition, SchemaTypeDefinition} from 'sanity'

import article from './documents/article'
import artist from './documents/artist'
import artwork from './documents/artwork'
import authorType from './documents/author'
import bookType from './documents/book'
import collection from './documents/collection'
import event from './documents/event'
import exhibition from './documents/exhibition'
import footer from './documents/footer'
import globalSEO from './documents/globalSEO'
import locationType from './documents/location'
import navigation from './documents/navigation'
import pageType from './documents/page'
import artistPage from './documents/pages/artistPage'
import exhibitionPage from './documents/pages/exhibitionPage'
import fairPage from './documents/pages/fairPage'
import postType from './documents/post'
import press from './documents/press'
import redirects from './documents/redirects'
import strings from './documents/strings'
import drawingType from './objects/artTypes/drawing'
import paintingType from './objects/artTypes/painting'
import photographType from './objects/artTypes/photography'
import sculptureType from './objects/artTypes/sculpture'
import social from './objects/data/social'
import dzCard from './objects/page/components/molecules/dzCard'
import dzCarousel from './objects/page/components/molecules/dzCarousel'
import dzEditorial from './objects/page/components/molecules/dzEditorial'
import dzHero from './objects/page/components/molecules/dzHero'
import dzHeroCarousel from './objects/page/components/molecules/DzHeroCarousel'
import dzInterstitial from './objects/page/components/molecules/dzInterstitial'
import dzSplit from './objects/page/components/molecules/dzSplit'
import dzTitle from './objects/page/components/molecules/dzTitle'
import editorialContent from './objects/page/editorialContent'
import grid from './objects/page/grid'
import row from './objects/page/layout'
import pageBuilderComponents from './objects/page/pageBuilderComponents'
import pageContent from './objects/page/pageContent'
import pageContentList from './objects/page/pageContentList'
import seo from './objects/page/seo'
import addressType from './objects/utils/address'
import breadcrumbItem from './objects/utils/breadcrumbItem'
import brickAndMortar from './objects/utils/brickAndMortar'
import cta from './objects/utils/cta'
import dateRange from './objects/utils/dateRange'
import dateSelection from './objects/utils/dateSelection'
import jsonLD from './objects/utils/jsonLdSchema'
import link from './objects/utils/link'
import media from './objects/utils/media'
import textComplex from './objects/utils/textComplex'
import availableArtworks from './singletons/availableArtworks'
import collect from './singletons/collect'
import home from './singletons/home'
import settings from './singletons/settings'
import stories from './singletons/stories'
import utopiaEditions from './singletons/utopiaEditions'

export const utilsObjects: ObjectDefinition[] = [
  textComplex,
  cta,
  link,
  media,
  brickAndMortar,
  jsonLD,
  breadcrumbItem,
]
export const pageComponents: ObjectDefinition[] = [
  dzHero,
  dzCard,
  dzEditorial,
  dzInterstitial,
  dzSplit,
  dzTitle,
  dzHeroCarousel,
  dzCarousel,
]

export const objects: ObjectDefinition[] = [
  drawingType,
  paintingType,
  photographType,
  sculptureType,
  social,
  addressType,
  dateSelection,
  seo,
  row,
  grid,
]

export const pageDocuments: DocumentDefinition[] = [artistPage, exhibitionPage, fairPage]
export const singletons: DocumentDefinition[] = [stories, home, collect, utopiaEditions, globalSEO]
export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    article,
    press,
    pageType,
    bookType,
    locationType,
    event,
    artwork,
    collection,
    strings,
    exhibition,
    artist,
    postType,
    authorType,
    dateRange,
    redirects,
    footer,
    navigation,
    settings,
    availableArtworks,
    pageContent,
    pageContentList,
    editorialContent,
    pageBuilderComponents,
    ...pageDocuments,
    ...objects,
    ...pageComponents,
    ...singletons,
    ...utilsObjects,
  ],
}
