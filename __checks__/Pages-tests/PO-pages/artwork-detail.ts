import {expect, Locator, Page} from '@playwright/test'

import {ArtistListingPage} from './artist-listing'

export class ArtworkDetailPage {
  readonly page: Page
  readonly headingH1: Locator
  readonly staticPageHeader: Locator
  readonly staticPageFooter: Locator
  readonly exploreAllArtWorksLink: Locator
  readonly firstArtwork: Locator

  constructor(page: Page) {
    this.page = page
    this.headingH1 = page.getByRole('heading', {level: 1})
    this.staticPageHeader = page.getByRole('banner', {name: 'Header'})
    this.staticPageFooter = page.getByRole('contentinfo', {name: 'Footer'})
    this.exploreAllArtWorksLink = page.getByRole('link', {name: 'Explore all Artworks'})
    this.firstArtwork = page.locator('a img').first()
  }

  async navigateToArtworkDtlPageAndCheckResponse(page: Page) {
    const artistListingPage = new ArtistListingPage(page)
    await page.route('**/*', (route) => route.continue())
    let retries = 0
    const maxRetries = 10
    while (retries < maxRetries) {
      await artistListingPage.waitForPageToLoadSuccessfully()
      await artistListingPage.goToRandomArtistPage()
      if (await this.exploreAllArtWorksLink.isVisible()) {
        await this.exploreAllArtWorksLink.click()
        break
      } else {
        console.log(
          `Explore all artworks link not visible, retrying... (Retry ${retries + 1}/${maxRetries})`
        )
        retries++
      }
    }
    await page.waitForURL('**/**/**/survey')
    await this.firstArtwork.click()
    await page.waitForURL('**/artworks/**', {waitUntil: 'load'})
    const artworkDetailPageResponse = await page.waitForResponse((response) => {
      return response.url().includes('artwork') && response.status() === 200
    })
    if (!artworkDetailPageResponse) {
      throw new Error('Page did not load successfully or did not return a 200 resposne')
    }
    expect(artworkDetailPageResponse).toBeTruthy()
    const activeArtworkDetailURL = page.url()
    expect(activeArtworkDetailURL).toContain('artwork')
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
}
