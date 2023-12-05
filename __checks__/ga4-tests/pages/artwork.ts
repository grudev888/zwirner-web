import {expect, Page} from '@playwright/test'

import {defaults} from '../../defaults'
import {GTMInquiryFormViewText} from '../constants/gtm.constants'
import {mapArtworkEventData} from '../utils/gtm.helper'
import GTMEventClass from '../utils/gtmClass'

export class ArtworkPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goToPage(slug: string) {
    await this.page.goto(`${defaults.baseURL}/${slug}`)
  }

  async checkInquiryForm(artwork: any = null) {
    const gtmEvent = new GTMEventClass(this.page)
    const href = await this.page.evaluate(() => window.location.href)

    await this.page
      .getByRole('button', {
        name:
          artwork.artworkCTA.CTA == 'inquire'
            ? artwork.artworkCTA.CTAText
            : artwork.artworkCTA.SecondaryCTAText,
      })
      .first()
      .click()

    await this.page.waitForFunction(
      (event) => window.dataLayer && window.dataLayer.some((layer: any) => layer.event == event),
      GTMInquiryFormViewText.event
    )

    await expect(
      await gtmEvent.getFilteredDataLayer(GTMInquiryFormViewText.event, ['event_data'])
    ).toContainEqual({
      ...GTMInquiryFormViewText,
      event_data: mapArtworkEventData(artwork, href),
    })
    // missing inquiry_submit event. Can't test submit event because of passing recaptcha
  }
}

export default ArtworkPage
