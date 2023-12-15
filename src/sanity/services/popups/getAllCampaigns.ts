import * as Sentry from '@sentry/nextjs'

import {client} from '@/sanity/client'
import {
  AllCampaignsSchema,
  AllCampaignsType,
  CustomNewsletterPopupFieldsType,
  PopupItemType,
} from '@/sanity/queries/popups/allCampaigns'
import {getCookie} from '@/utils/cookies/getCookie'

export type PopUpInfo = {
  id: PopupItemType['_key']
  campaignId: AllCampaignsType[0]['_id']
  campaignName: AllCampaignsType[0]['title']
  popupName: PopupItemType['name']
  type: PopupItemType['type']
  daysToExpire: AllCampaignsType[0]['cookieDaysToExpire']
  displayAlways: PopupItemType['displayAlways']
  triggers: PopupItemType['triggers']
  title: CustomNewsletterPopupFieldsType['title']
  description: CustomNewsletterPopupFieldsType['description']
  image: {
    src: string
    alt: string
  } | null
  primaryCTA: {
    text: string | null
    action?: string | null
    link?: {
      href: string | null
      blank?: boolean
    }
  } | null
}

type PopUpDictionary = {
  [key: string]: PopUpInfo
}

// 'Section' is a collection of pages e.g [artists detail pages, artists landing, ...]
enum PageSections {
  'All Articles' = 'article',
  'All Artist Pages' = 'artistPage',
  'All Exhibition Pages' = 'exhibitionPage',
  'All Exceptional Works' = 'exceptionalWork',
  'All Fairs' = 'fairPage',
  'All Online Exhibitions' = 'onlineExhibitionPage',
  'Landing Page: Available Artworks' = 'availableArtworks',
  'Landing Page: Artist Listing' = 'artistListing',
  'Landing Page: Exhibitions Landing' = 'exhibitionsLanding',
  'Landing Page: Exhibitions Past' = 'exhibitionsPast',
  'Landing Page: Home Page' = 'home',
  'Special Pages' = 'page',
  'Single Page Record' = 'singlePageRecord',
}
type PageSectionsKeys = Array<keyof typeof PageSections>

const landingTypeToURL: Record<string, string> = {
  availableArtworks: '/available-artworks',
  artistListing: '/artists',
  exhibitionsLanding: '/exhibitions',
  exhibitionsPast: '/exhibitions/past-exhibitions',
  home: '/',
}

type GetPopupPerPageArgs = {
  url: string
  pageType: string | undefined
  popupsPerPages: PopUpDictionary | null | undefined
}

const normalizeArgs = ({url, pageType}: Omit<GetPopupPerPageArgs, 'popupsPerPages'>) => {
  // url refers to a subpage of an artist page if it consists of more than 3 parts. Ex.: /artists/marlene-dumas/survey
  const isArtistsSubpagePage = url.startsWith('/artists/') ? url.split('/').length > 3 : false
  const unifiedUrl = isArtistsSubpagePage ? url.split('/').slice(0, -1).join('/') : url
  const unifiedPageType = isArtistsSubpagePage ? PageSections['All Artist Pages'] : pageType
  return {unifiedUrl, unifiedPageType}
}

export const getPopupPerPage = ({url, pageType, popupsPerPages}: GetPopupPerPageArgs) => {
  if (!popupsPerPages || !url) return undefined
  const {unifiedUrl, unifiedPageType} = normalizeArgs({url, pageType})

  const pageSectionsKeys = Object.keys(PageSections) as PageSectionsKeys
  const sectionKey = pageSectionsKeys.find((key) => PageSections[key] === unifiedPageType) ?? ''

  if (!popupsPerPages[unifiedUrl] && !popupsPerPages[sectionKey]) return undefined

  // pick record by url if exists (single page. Ex.: /artists/marlene-dumas)
  const popupDataByUrl = popupsPerPages[unifiedUrl]
  if (popupDataByUrl) {
    // check that the popup is not already displayed
    const hasCookieByUrl = getCookie(`${popupDataByUrl.campaignName}-${popupDataByUrl.id}`)
    if (hasCookieByUrl) return undefined
  }

  // pick record by section if exists (group of pages. Ex.: /artists/*)
  const popupDataBySectionKey = popupsPerPages[sectionKey]

  if (popupDataBySectionKey) {
    // check that the popup is not already displayed
    const hasCookieBySection = getCookie(
      `${popupDataBySectionKey.campaignName}-${popupDataBySectionKey.id}`
    )
    if (hasCookieBySection) return undefined
  }

  return popupDataByUrl ?? popupDataBySectionKey
}

type AddToDictionaryType = {
  url: string | undefined
  popup: PopUpInfo
  dictionary: PopUpDictionary
}

const addPopupToDictionary = (
  {url, popup, dictionary}: AddToDictionaryType,
  {allPagesKey}: {allPagesKey?: string}
) => {
  // only add first occurrence

  if (url && !dictionary?.[url]) {
    dictionary[url] =
      // If an ALL section already exists, takes precedence
      allPagesKey && dictionary[allPagesKey]
        ? (dictionary[allPagesKey] as PopUpInfo)
        : null ?? popup
  }
}

/* This mapper filters campaign popups an return an object with the following shape: { [url]: {highest priority popup for the url} } */
const getPopupDictionary = (campaigns: AllCampaignsType) => {
  return campaigns.reduce((prev, curr) => {
    const prevCopy = {...prev}
    const {_id, title, popupsList = [], cookieDaysToExpire} = curr ?? {}
    popupsList?.forEach((item) => {
      const {displayAlways = false, type: popUpType, name, triggers, filterSections = []} = item

      filterSections?.forEach((section) => {
        const {type, page} = section ?? {}
        const {url, _type} = page ?? {}

        const indexType = Object.values(PageSections).indexOf(type as unknown as PageSections)
        const sectionKey = Object.keys(PageSections)[indexType]
        const isNewsOrPromo = item.type === 'newsletter' || item.type === 'customPromo'
        const popupInf = {
          campaignId: _id,
          campaignName: title,
          popupName: name,
          type: popUpType,
          daysToExpire: cookieDaysToExpire,
          displayAlways,
          triggers,
          image: null,
          primaryCTA: null,
          id: item._key,
        } as PopUpInfo

        if (isNewsOrPromo) {
          popupInf.title = item.title
          popupInf.description = item.description
          if (item.primaryCTA?.text) {
            popupInf.primaryCTA = item.primaryCTA
          }
          if (item.media?.type === 'Image') {
            popupInf.image = {
              src: item.media.image?.url,
              alt: item.media.alt ?? '',
            }
          }
        }

        let dictionaryKey
        let extras = {}

        // The target is a single page or a special page
        if (
          (type === PageSections['Single Page Record'] || type === PageSections['Special Pages']) &&
          url
        ) {
          dictionaryKey = url
          const indexOfAllPages = Object.values(PageSections).indexOf(
            _type as unknown as PageSections
          )
          const allPagesKey = Object.keys(PageSections)[indexOfAllPages]
          extras = {allPagesKey}
          // The target is a hardcoded page
        } else if (type && landingTypeToURL[type]) {
          dictionaryKey = landingTypeToURL[type]
          // The target is a section
        } else if (sectionKey) {
          dictionaryKey = sectionKey
        }
        addPopupToDictionary(
          {
            url: dictionaryKey,
            popup: popupInf,
            dictionary: prevCopy,
          },
          extras
        )
      })
    })
    return prevCopy
  }, {} as PopUpDictionary)
}

// called client-side with SWR
export async function getAllCampaigns(query: string) {
  const data = await client.fetch(query)
  const validatedData = AllCampaignsSchema.safeParse(data)
  if (!validatedData.success) {
    Sentry.captureException(validatedData.error)
    return [] as unknown as PopUpDictionary
  }
  return getPopupDictionary(validatedData.data)
}
