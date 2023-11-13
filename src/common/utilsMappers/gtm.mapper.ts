import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'
import {GtmPageLoadDataType} from '@/sanity/queries/gtm/pageLoad.queries'
import {GtmCommonDataType} from '@/sanity/queries/gtm/validationPrimitives'
import usePageStore from '@/store/pageStore'

type MapEcommerceData = (
  artwork: ArtworkDataType,
  extra?: {
    currency?: boolean
    item_list_id?: boolean
    item_list_name?: boolean
    items?: {item_list_id?: boolean; item_list_name?: boolean; price?: boolean}
  }
) => DataLayerEcommerceProps

export const mapEcommerceData: MapEcommerceData = (artwork, extra) => {
  const {title, hash, section} = usePageStore.getState()
  const ecommerce: DataLayerEcommerceProps = {
    items: [
      {
        affiliation: 'DZW',
        artwork_ecommerce: artwork?.product?.variants[0].store?.inventory?.isAvailable
          ? 'yes'
          : 'no',
        artwork_frame: artwork?.framed,
        artwork_price: artwork?.price,
        artwork_size: artwork?.dimensions ? artwork?.dimensions[0]?.children[0]?.text : '',
        artwork_status: artwork?.product?.variants[0].store?.inventory?.isAvailable
          ? 'available'
          : 'sold',
        item_brand: artwork?.artists?.at(0)?.fullName,
        item_category: title,
        item_category2: section,
        item_category3: artwork?.artworkType,
        item_category4: artwork?.medium,
        item_category5: artwork?._createdAt,
        item_id: artwork?.inventoryId,
        item_name: artwork?.title,
        item_variant: artwork?.dateSelection?.year,
      },
    ],
  }

  if (extra?.item_list_id) ecommerce.item_list_id = hash
  if (extra?.item_list_name) ecommerce.item_list_name = title
  if (extra?.currency) ecommerce.currency = artwork?.currency
  if (extra?.items?.item_list_id && ecommerce.items[0]) ecommerce.items[0].item_list_id = hash
  if (extra?.items?.item_list_name && ecommerce.items[0]) ecommerce.items[0].item_list_name = title
  if (extra?.items?.price && ecommerce.items[0])
    ecommerce.items[0].price = artwork?.product?.variants[0].store?.price

  return ecommerce
}

declare global {
  interface Window {
    dataLayer: Record<string, any>
  }

  type DataLayerProps = {
    event: GtmCommonDataType['event']
    detailed_event: GtmCommonDataType['detailed_event']
    page_data?: DataLayerPageDataProps
    user_data?: DataLayerUserDataProps
    event_data?: DataLayerEventDataProps
    ecommerce?: DataLayerEcommerceProps
  }

  type DataLayerPageDataProps = GtmPageLoadDataType['page_data'] & {user_login_state?: string}

  type DataLayerUserDataProps = GtmPageLoadDataType['user_data'] | {event_form_hashemail: string}

  type DataLayerEcommerceProps = {
    count_checkout_payment_step_completions?: number
    coupon?: string
    currency?: 'EUR' | 'USD' | 'GBP' | 'HKD' | null | undefined
    facets?: string
    item_list_id?: string
    item_list_name?: string
    items: {
      affiliation: string
      artwork_ecommerce: string
      artwork_frame: string
      artwork_price: number | null | undefined
      artwork_size: string
      artwork_status: string
      item_brand: string
      item_category: string
      item_category2: string
      item_category3: string
      item_category4: string | null
      item_category5: string
      item_id: string | null
      item_list_id?: string
      item_list_name?: string
      item_name: string
      item_variant: string
      price?: number
      quantity?: number
    }[]
    order_level_discount?: string
    payment_method?: string
    shipping?: number
    shipping_tier?: string
    tax?: number
    transaction_id?: string
    type?: string
    value?: number
  }

  export type DataLayerEventDataProps = {
    artist?: string
    artwork_collection?: string
    artwork_ecommerce?: string
    artwork_frame?: string
    artwork_id?: string
    artwork_material?: string
    artwork_posteddate?: string
    artwork_price?: number
    artwork_size?: string
    artwork_status?: string
    artwork_title?: string
    artwork_type?: string
    artwork_year?: string
    cta_value?: string
    error_message?: string
    file_extension?: string
    file_name?: string
    identifier?: string
    link_url?: string
    podcast_percent?: number
    podcast_title?: string
    method?: string
    mode?: string
    number_of_results?: number
    name?: string
    search_term?: string
    step_name?: string
    step_number?: string
    type?: string
  }
}
