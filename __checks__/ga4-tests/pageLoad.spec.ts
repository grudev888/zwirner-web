import {expect, test} from '@playwright/test'

import {defaults} from '../defaults'
import {GTMPageLoadCompletedText, GTMPageLoadStartedText} from './constants/gtm.constants'
import {SECTION_BY_TYPE} from './constants/section.constants'
import {getPageInfo, pageTypes} from './sanity/services/pageLoad.service'
import {mapArtistsToString} from './utils/gtm.helper'
import GTMEventClass from './utils/gtmClass'

for (const pageType of pageTypes) {
  test(`Emit GA4:${GTMPageLoadStartedText.event}, ${GTMPageLoadCompletedText.event} events when page's loading is started and completed in type name is ${pageType}`, async ({
    page,
  }) => {
    // const artistPage = new ArtistPage(page)
    const gtmEvent = new GTMEventClass(page)

    const gtmBaseData: any = await getPageInfo(pageType)
    // TODO: Currently, slug of home page is 'home' not '/'. So ternary operator is required here.
    await page.goto(`${defaults.baseURL}/${pageType === 'home' ? '' : gtmBaseData.slug.current}`)
    const {lang, location, title}: any = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      location: window.location,
      title: document.title,
    }))
    await page.waitForFunction(() => window?.dataLayer)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMPageLoadStartedText.event, ['page_data', 'user_data'])
    ).toContainEqual({
      ...GTMPageLoadStartedText,
      page_data: {
        artist: gtmBaseData.artists ? mapArtistsToString(gtmBaseData.artists) : '',
        country: GTMPageLoadStartedText.page_data.country,
        language: lang,
        page_hash: gtmBaseData._rev,
        page_hostname: location.hostname,
        page_location: location.href,
        page_path: location.pathname,
        page_query_hash: location.hash,
        page_query_string: location.search,
        page_title: title,
        page_update_date: gtmBaseData._updatedAt,
        site_section: SECTION_BY_TYPE[pageType],
      },
      user_data: {shopify_52w: '', shopify_dzb: '', shopify_dzw: '', user_id: '', visitor_id: ''},
    })
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMPageLoadCompletedText.event)
    ).toContainEqual({
      ...GTMPageLoadCompletedText,
    })
  })
}
