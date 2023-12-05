import {
  GTMInquiryFormStartText,
  GTMInquiryFormSubmitText,
  GTMInquiryFormViewText,
} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'
import {InquireModalProps} from '@/components/hooks/useOpenInquiryDispatch'

export const INQUIRY_FORM_EVENT_NAME = 'Inquiry Form'
const identifier = '1bf1d9e2-b02f-47b6-9a5d-ecd45ad17662'

const mapEventData: (modalProps: InquireModalProps) => DataLayerEventDataProps = (modalProps) => {
  const artwork = modalProps?.contextData?.artwork
  return {
    artist: artwork?.artists?.at(0)?.fullName || '',
    artwork_collection: window.location.href,
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
    cta_value: artwork?.artworkCTA?.CTAText || modalProps?.contextData?.ctaText || 'Inquire',
    identifier,
    name: INQUIRY_FORM_EVENT_NAME,
    type: modalProps?.inquiryCategory || '',
  }
}

export const gtmInquiryFormViewEvent = (modalProps: InquireModalProps) => {
  gtmEvent(GTMInquiryFormViewText.event, {
    ...GTMInquiryFormViewText,
    event_data: mapEventData(modalProps),
  })
}

export const gtmInquiryFormStartedEvent = (modalProps: InquireModalProps) => {
  gtmEvent(GTMInquiryFormStartText.event, {
    ...GTMInquiryFormStartText,
    event_data: mapEventData(modalProps),
  })
}

export const gtmInquiryFormSubmitEvent = (modalProps: InquireModalProps, email: string) => {
  gtmEvent(GTMInquiryFormSubmitText.event, {
    ...GTMInquiryFormSubmitText,
    event_data: mapEventData(modalProps),
    user_data: {event_form_hashemail: btoa(email)},
  })
}
