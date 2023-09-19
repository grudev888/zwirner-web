import {env} from '@/env.mjs'

const GTM_ID = env.NEXT_PUBLIC_GTM_ID

export const GTMScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
`

export const GTMNoScript = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />
`

// Page Load Events
export const GTMPageLoadStartedText = {
  event: 'page_load_started',
  detailed_event: 'Page Load Started',
  page_data: {
    country: 'US',
  },
}

export const GTMPageLoadCompletedText = {
  event: 'page_view',
  detailed_event: 'Page Load Completed',
}

// Consignment Events
export const GTMConsignmentFormText = {
  event_data: {
    name: 'Consignment Form',
    type: 'Consignments',
  },
}

export const GTMConsignmentFormViewText = {
  event: 'consignment_view',
  detailed_event: 'Consignment Form Views',
  GTMConsignmentFormText,
}

export const GTMConsignmentFormStartText = {
  event: 'consignment_start',
  detailed_event: 'Consignment Start',
  GTMConsignmentFormText,
}

export const GTMConsignmentFormStepText = {
  event: 'consignment_step',
  detailed_event: 'Consignment Step Reached',
  GTMConsignmentFormText,
}

export const GTMConsignmentFormSubmitText = {
  event: 'consignment_submit',
  detailed_event: 'Consignment Submit',
  GTMConsignmentFormText,
}

// Click Link Events
export const GTMDownloadLinkText = {
  event: 'file_download',
  detailed_event: 'Download Link Clicked',
}

export const GTMExternalLinkText = {
  event: 'outbound_click',
  detailed_event: 'Exit Link Clicked',
}

// Error Message Event
export const GTMErrorMessageText = {
  event: 'site_error',
  detailed_event: 'Error Message Presented',
}

// Form Events
export const GTMFormSubmitText = {
  event: 'form_complete',
  detailed_event: 'Form Submission Succeeded',
}

export const GTMFormViewText = {
  event: 'form_view',
  detailed_event: 'Form Viewed',
}

export const GTMFormStartText = {
  event: 'form_start',
  detailed_event: 'Form Started',
}

export const GTMFormStepText = {
  event: 'form_step',
  detailed_event: 'Form Step Reached',
}

// Inquiry Form Events
export const GTMInquiryFormStartText = {
  event: 'inquiry_start',
  detailed_event: 'Inquiry Form Started',
}

export const GTMInquiryFormSubmitText = {
  event: 'inquiry_submit',
  detailed_event: 'Inquiry Form Submit',
}

export const GTMInquiryFormViewText = {
  event: 'inquiry_view',
  detailed_event: 'Inquiry Form Viewed',
}

// Interstitial Events
export const GTMInterstitialViewText = {
  event: 'view_interstitial',
  detailed_event: 'Interstitial Viewed',
}

export const GTMInterstitialClickText = {
  event: 'interstitial_click',
  detailed_event: 'Interstitial Clicked',
}

// Search and Filter Events
export const GTMOnsiteSearchPerformedText = {
  event: 'search',
  detailed_event: 'Onsite Search Performed',
}

export const GTMOnsiteSearchResultsClickText = {
  event: 'select_search_result',
  detailed_event: 'Onsite Search Results Clicked',
}

export const GTMListingFilterAddText = {
  event: 'filter_add',
  detailed_event: 'Listing Filter Added',
}

// Podcast Events
export const GTMPodcastStartText = {
  event: 'podcast_start',
  detailed_event: 'Podcast Start',
}

export const GTMPodcastProgressText = {
  event: 'podcast_progress',
  detailed_event: 'Podcast Progress',
}

export const GTMPodcastCompleteText = {
  event: 'podcast_complete',
  detailed_event: 'Podcast Complete',
}

// Product Events
export const GTMProductListingViewedText = {
  event: 'view_item_list',
  detailed_event: 'Product Listing Viewed',
}

export const GTMProductListingClickedText = {
  event: 'select_item',
  detailed_event: 'Product Listing Item Clicked',
}

export const GTMProductViewText = {
  event: 'view_item',
  detailed_event: 'Product Viewed',
}

export const GTMProductAddToCartText = {
  event: 'add_to_cart',
  detailed_event: 'Product Added to Cart',
}

export const GTMProductRemoveFromCartText = {
  event: 'remove_from_cart',
  detailed_event: 'Product Removed from Cart',
}

// Social Share Events
export const GTMSocialShareText = {
  event: 'share',
  detailed_event: 'Social Contend Shared',
}

// User Events
export const GTMUserRegistrationText = {
  event: 'sign_up',
  detailed_event: 'User Registered',
}

export const GTMUserSignInText = {
  event: 'login',
  detailed_event: 'User Signed In',
}

export const GTMUserSignOutText = {
  event: 'logout',
  detailed_event: 'User Signed Out',
}

export const GTMDarkModeSwitchText = {
  event: 'dark_light_mode',
  detailed_event: 'Dark Ligth Mode Switched',
}

// User Subscription/Newsletter Events
export const GTMUserSubscriptionFormViewText = {
  event: 'subscribe_view',
  detailed_event: 'User Subscription Form Viewed',
}

export const GTMUserSubscriptionFormStartedText = {
  event: 'subscribe_start',
  detailed_event: 'User Subscription Started',
}

export const GTMUserSubscriptionText = {
  event: 'subscribe',
  detailed_event: 'User Subscribed',
}
