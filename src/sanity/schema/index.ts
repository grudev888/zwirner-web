import {SchemaTypeDefinition} from 'sanity'

import artist from './documents/artist'
import artwork from './documents/artwork'
import authorType from './documents/author'
import bookType from './documents/book'
import collection from './documents/collection'
import event from './documents/event'
import exhibition from './documents/exhibition'
import locationType from './documents/location'
import pageType from './documents/page'
import postType from './documents/post'
import drawingType from './objects/artTypes/drawing'
import paintingType from './objects/artTypes/painting'
import photographType from './objects/artTypes/photograph'
import sculptureType from './objects/artTypes/sculpture'
import social from './objects/data/social'
import heroType from './objects/presentational/hero'
import accessibleImage from './objects/utils/accessibleImage'
import addressType from './objects/utils/address'
import dateRange from './objects/utils/dateRange'
import dateSelection from './objects/utils/dateSelection'

export const previewTypes = [artwork.name, postType.name]

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    heroType,
    pageType,
    paintingType,
    drawingType,
    bookType,
    locationType,
    event,
    artwork,
    collection,
    exhibition,
    artist,
    sculptureType,
    photographType,
    postType,
    authorType,
    accessibleImage,
    dateRange,
    dateSelection,
    addressType,
    social,
  ],
}
