import {
  ARTWORK_INQUIRY_FORM_EVENT_TYPE,
  GENERAL_INQUIRY_FORM_EVENT_TYPE,
  INQUIRY_FORM_EVENT_NAME,
} from '../constants/common.constants'

export const getFileInfo = (url: string) => {
  const fileArray = url.split('/')
  const file = fileArray[fileArray.length - 1]
  if (!file) return [null, null]
  const fileNameArray = file.split('.')
  return [fileNameArray[fileNameArray.length - 2], fileNameArray[fileNameArray.length - 1]]
}

export const mapEcommerceData: any = (artwork: any, pageData: any, extra: any) => {
  const {title, hash, section} = pageData
  const ecommerce: DataLayerEcommerceProps = {
    items: [
      {
        affiliation: 'DZW',
        artwork_ecommerce: artwork.product?.variants[0].store?.inventory?.isAvailable
          ? 'yes'
          : 'no',
        artwork_frame: artwork.framed,
        artwork_price: artwork.price?.toString() || '',
        artwork_size: artwork.dimensions ? artwork.dimensions[0]?.children[0]?.text || '' : '',
        artwork_status: artwork.product?.variants[0].store?.inventory?.isAvailable
          ? 'available'
          : 'sold',
        item_brand: artwork.artists?.at(0)?.fullName || '',
        item_category: title,
        item_category2: section,
        item_category3: artwork.artworkType,
        item_category4: artwork.medium || '',
        item_category5: artwork._createdAt,
        item_id: artwork.inventoryId || '',
        item_name: artwork.title,
        item_variant: artwork.dateSelection.year,
      },
    ],
  }

  if (extra?.item_list_id) ecommerce.item_list_id = hash
  if (extra?.item_list_name) ecommerce.item_list_name = title
  if (extra?.currency) ecommerce.currency = artwork.currency || ''
  if (extra?.items?.item_list_id && ecommerce.items[0]) ecommerce.items[0].item_list_id = hash
  if (extra?.items?.item_list_name && ecommerce.items[0]) ecommerce.items[0].item_list_name = title
  if (extra?.items?.price && ecommerce.items[0])
    ecommerce.items[0].price = artwork.product?.variants[0].store?.price || 0

  return ecommerce
}

export const mapArtworkEventData = (artwork: any, href: string) => ({
  artist: artwork?.artists?.at(0)?.fullName || '',
  artwork_collection: href,
  artwork_ecommerce: artwork ? (artwork.availability ? 'yes' : 'no') : '',
  artwork_frame: artwork?.framed || '',
  artwork_id: artwork?._id || '',
  artwork_material: artwork?.medium || '',
  artwork_posteddate: artwork?._createdAt || '',
  artwork_price: artwork?.price || 0,
  artwork_size: artwork?.dimensions ? artwork?.dimensions[0]?.children[0]?.text : '',
  artwork_status: artwork?.product
    ? artwork.product.variants[0].store?.inventory?.isAvailable
      ? 'available'
      : 'sold'
    : '',
  artwork_title: artwork?.title || '',
  artwork_type: artwork?.artworkType || '',
  artwork_year: artwork?.dateSelection?.year || '',
  cta_value: artwork?.artworkCTA?.CTAText || 'Inquire',
  identifier: '1bf1d9e2-b02f-47b6-9a5d-ecd45ad17662',
  name: INQUIRY_FORM_EVENT_NAME,
  type: artwork ? ARTWORK_INQUIRY_FORM_EVENT_TYPE : GENERAL_INQUIRY_FORM_EVENT_TYPE,
})

export function mapArtistsToString(artistPages: Array<any>): string {
  return artistPages.map((artist) => artist.artist.fullName).toString()
}
