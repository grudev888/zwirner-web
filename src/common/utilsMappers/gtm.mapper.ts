import {GtmPageLoadDataType} from '@/sanity/queries/gtm/pageLoad.queries'
import {GtmCommonDataType} from '@/sanity/queries/gtm/validationPrimitives'

export {}

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
    count_checkout_payment_step_completions: number
    coupon: string
    currency: string
    facets: string
    item_list_id: string
    item_list_name: string
    items: {
      affiliation: string
      artwork_ecommerce: string
      artwork_frame: string
      artwork_price: string
      artwork_size: string
      artwork_status: string
      item_brand: string
      item_category: string
      item_category2: string
      item_category3: string
      item_category4: string
      item_category5: string
      item_id: string
      item_list_id: string
      item_list_name: string
      item_name: string
      item_variant: string
      price: number
      quantity: number
    }[]
    order_level_discount: string
    payment_method: string
    shipping: number
    shipping_tier: string
    tax: number
    transaction_id: string
    type: string
    value: number
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
