import {
  GTMProductListingClickedText,
  GTMProductListingViewedText,
  GTMProductViewText,
} from '@/common/constants/gtmConstants'
import {mapEcommerceData} from '@/common/utilsMappers/gtm.mapper'
import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'

import {gtmEvent} from './gtmEvent'

export const gtmProductListingViewedEvent = (artwork: ArtworkDataType) => {
  gtmEvent(GTMProductListingViewedText.event, {
    ...GTMProductListingViewedText,
    ecommerce: mapEcommerceData(artwork, {
      item_list_id: true,
      item_list_name: true,
    }),
  })
}
export const gtmProductListingItemClickedEvent = (artwork: ArtworkDataType) => {
  const ecommerce = mapEcommerceData(artwork, {
    item_list_id: true,
    item_list_name: true,
    items: {item_list_id: true, item_list_name: true},
  })
  gtmEvent(GTMProductListingClickedText.event, {
    ...GTMProductListingClickedText,
    ecommerce,
  })
}
export const gtmProductViewEvent = (artwork: ArtworkDataType) => {
  const ecommerce = mapEcommerceData(artwork, {
    currency: true,
    items: {item_list_id: true, item_list_name: true, price: true},
  })
  gtmEvent(GTMProductViewText.event, {
    ...GTMProductViewText,
    ecommerce,
  })
}
