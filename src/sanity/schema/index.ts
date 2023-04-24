import {type DocumentDefinition, type ObjectDefinition, SchemaTypeDefinition} from 'sanity'

import article from './documents/article'
import artist from './documents/artist'
import artistPage from './documents/artistPage'
import artwork from './documents/artwork'
import authorType from './documents/author'
import bookType from './documents/book'
import collection from './documents/collection'
import event from './documents/event'
import exhibition from './documents/exhibition'
import exhibitionPage from './documents/exhibitionPage'
import fairPage from './documents/fairPage'
import footer from './documents/footer'
import locationType from './documents/location'
import navigation from './documents/navigation'
import pageType from './documents/page'
import postType from './documents/post'
import press from './documents/press'
import redirects from './documents/redirects'
import strings from './documents/strings'
import drawingType from './objects/artTypes/drawing'
import paintingType from './objects/artTypes/painting'
import photographType from './objects/artTypes/photography'
import sculptureType from './objects/artTypes/sculpture'
import social from './objects/data/social'
import dzCard from './objects/page/components/dzCard'
import dzHero from './objects/page/components/dzHero'
import dzImage from './objects/page/components/dzImage'
import dzRichText from './objects/page/components/dzRichText'
import pageContent from './objects/page/pageContent'
import seo from './objects/page/seo'
import heroType from './objects/presentational/hero'
import addressType from './objects/utils/address'
import dateRange from './objects/utils/dateRange'
import dateSelection from './objects/utils/dateSelection'
import availableArtworks from './singletons/availableArtworks'
import collect from './singletons/collect'
import home from './singletons/home'
import settings from './singletons/settings'
import stories from './singletons/stories'
import utopiaEditions from './singletons/utopiaEditions'

export const pageComponents: ObjectDefinition[] = [dzHero, dzCard, dzRichText, dzImage]
export const objects: ObjectDefinition[] = [
  drawingType,
  paintingType,
  photographType,
  sculptureType,
  social,
  heroType,
  addressType,
  dateSelection,
  seo,
]

export const singletons: DocumentDefinition[] = [stories, home, collect, utopiaEditions]
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
    artistPage,
    exhibitionPage,
    fairPage,
    availableArtworks,
    pageContent,
    ...objects,
    ...pageComponents,
    ...singletons,
  ],
}
