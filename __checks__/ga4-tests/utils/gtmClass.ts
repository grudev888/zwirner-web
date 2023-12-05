import {expect, Page, test} from '@playwright/test'
import {pick} from 'lodash'

import {TEST_EMAIL} from '../constants/common.constants'
import {GTMInquiryFormStartText, GTMInquiryFormViewText} from '../constants/gtm.constants'
import {mapArtworkEventData} from './gtm.helper'

export type SocialLinkName = 'Twitter Icon' | 'Facebook Icon' | 'Instagram Icon'

export class GTMEventClass {
  readonly page: Page
  readonly defaultEventKeys = ['detailed_event', 'event']

  constructor(page: Page) {
    this.page = page
  }

  getDataLayer() {
    return this.page.evaluate(() => window.dataLayer)
  }

  async getFilteredDataLayer(event: string, propertyPaths: string[] = []) {
    return (await this.getDataLayer())
      .filter((layer: any) => layer?.event == event)
      .map((layer: any) => pick(layer, [...this.defaultEventKeys, ...propertyPaths]))
  }

  async checkInquiryFormInCard(artwork: any = null) {
    await test.step(`Emit GA4:${GTMInquiryFormViewText.event} event when clicking InquireBtn`, async () => {
      await this.checkInquiryFormViewInCard(artwork)
    })

    await test.step(`Emit GA4:${GTMInquiryFormStartText.event} event when any field is started to insert`, async () => {
      await this.checkInquiryFormStartInCard(artwork)
    })
    // missing inquiry_submit event. Can't test submit event because of passing recaptcha
  }

  async checkInquiryFormViewInCard(artwork: any) {
    const href = await this.page.evaluate(() => window.location.href)

    if (artwork)
      await this.page
        .getByRole('link', {
          name: artwork.photos[0].image.alt,
        })
        .getByRole('button', {
          name:
            artwork.artworkCTA.CTA == 'inquire'
              ? artwork.artworkCTA.CTAText || 'Inquire'
              : artwork.artworkCTA.SecondaryCTAText || 'Inquire',
        })
        .click()
    else await this.page.getByRole('button', {name: 'Inquire'}).first().click()

    await this.page.waitForFunction(
      (event) => window.dataLayer && window.dataLayer.some((layer: any) => layer.event == event),
      GTMInquiryFormViewText.event
    )

    await expect(
      await this.getFilteredDataLayer(GTMInquiryFormViewText.event, ['event_data'])
    ).toContainEqual({
      ...GTMInquiryFormViewText,
      event_data: mapArtworkEventData(artwork, href),
    })
  }
  async checkInquiryFormStartInCard(artwork: any) {
    await this.page.getByPlaceholder('Email Address').fill(TEST_EMAIL)
    await expect(
      await this.getFilteredDataLayer(GTMInquiryFormStartText.event, ['event_data'])
    ).toContainEqual({
      ...GTMInquiryFormStartText,
      event_data: mapArtworkEventData(
        artwork,
        await this.page.evaluate(() => window.location.href)
      ),
    })
  }
}

export default GTMEventClass
