import {GTMInquiryFormSubmitText, GTMInquiryFormViewText} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'

export const INQUIRY_FORM_EVENT_NAME = 'Inquiry Form'
export const INQUIRY_FORM_EVENT_TYPE = 'Artwork'

const mapEventData = (artwork: any) => ({
  artist: artwork?.artists?.at(0)?.fullName,
  artwork_collection: 'https://www.davidzwirner.com/available-artworks',
  artwork_ecommerce: artwork?.availability ? 'yes' : 'no',
  artwork_id: `{${artwork?._id}}`,
  artwork_material: artwork?.medium,
  artwork_posteddate: artwork?._createdAt,
  artwork_price: artwork?.price,
  artwork_size: artwork?.dimensions[0]?.children[0]?.text,
  artwork_status: artwork?.product?.variants[0].store?.inventory?.isAvailable
    ? 'available'
    : 'sold',
  artwork_title: artwork?.title,
  type: INQUIRY_FORM_EVENT_TYPE,
  artwork_year: artwork?.dateSelection?.year,
  cta_value: artwork?.artworkCTA?.CTAText ?? 'Inquire',
  identifier: '1bf1d9e2-b02f-47b6-9a5d-ecd45ad17662',
  name: INQUIRY_FORM_EVENT_NAME,
  artwork_frame: artwork?.framed,
  artwork_type: artwork?.artworkType,
})

export const gtmInquiryFormViewEvent = (artwork: any) => {
  gtmEvent(GTMInquiryFormViewText.event, {
    ...GTMInquiryFormViewText,
    event_data: mapEventData(artwork),
  })
}

export const gtmInquiryFormSubmitEvent = (artwork: any, email: string) => {
  gtmEvent(GTMInquiryFormSubmitText.event, {
    ...GTMInquiryFormSubmitText,
    event_data: mapEventData(artwork),
    user_data: {event_form_hashemail: btoa(email)},
  })
}
