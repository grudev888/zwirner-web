import {expect, Locator, Page} from '@playwright/test'

import {ArtistListingPage} from './artist-listing'

export class ArtistDetailsPage {
  readonly page: Page
  readonly headingH1: Locator
  readonly staticPageHeader: Locator
  readonly staticPageFooter: Locator

  constructor(page: Page) {
    this.page = page
    this.headingH1 = page.getByRole('heading', {level: 1})
    this.staticPageHeader = page.getByRole('banner', {name: 'Header'})
    this.staticPageFooter = page.getByRole('contentinfo', {name: 'Footer'})
  }

  async checkHeadingOfPage() {
    await expect(this.headingH1).toBeVisible()
  }

  async checkPageStaticHeader() {
    await expect(this.staticPageHeader).toBeVisible()
  }

  async checkPageStaticFooter() {
    await this.staticPageFooter.scrollIntoViewIfNeeded()
    await expect(this.staticPageFooter).toBeVisible()
  }

  async navigateToArtistDtlPageAndCheckResponse(page: Page) {
    const artistListingPage = new ArtistListingPage(page)
    await artistListingPage.waitForPageToLoadSuccessfully()
    await artistListingPage.goToRandomArtistPage()
    const artistDetailPageResponse = await page.waitForResponse((response) => {
      return response.url().includes('artists') && response.status() === 200
    })
    if (!artistDetailPageResponse) {
      throw new Error('Page did not load successfully or did not return a 200 resposne')
    }
    const artistDtlPageUrlPattern = /\/artists\/(?!$)[^/]+$/
    const currentUrl = page.url()
    expect(currentUrl).toMatch(artistDtlPageUrlPattern)
  }
}
