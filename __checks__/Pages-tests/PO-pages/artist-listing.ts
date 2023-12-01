import {expect, Locator, Page} from '@playwright/test'

import {defaults} from '../../defaults'

export class ArtistListingPage {
  readonly page: Page
  readonly headingH1: Locator
  readonly artistsNameList: Locator
  readonly staticPageHeader: Locator
  readonly staticPageFooter: Locator
  readonly artListPageURL: string

  constructor(page: Page) {
    this.artListPageURL = '/artists'
    this.page = page
    this.headingH1 = page.getByRole('heading', {level: 1})
    this.artistsNameList = page
      .locator('#options-container')
      .getByRole('list')
      .getByRole('listitem')
    this.staticPageHeader = page.getByRole('banner', {name: 'Header'})
    this.staticPageFooter = page.getByRole('contentinfo', {name: 'Footer'})
  }
  async waitForPageToLoadSuccessfully() {
    const response = await this.page.goto(defaults.baseURL + this.artListPageURL, {
      waitUntil: 'load',
    })
    if (!response || response.status() !== 200) {
      throw new Error(`Page didn't load successfully. Actual status: ${response!.status()}`)
    }
    expect(response.status()).toBe(200)
  }

  async checkHeadingOfPage() {
    await expect(this.headingH1).toBeVisible()
  }

  async checkArtistListIsNotEmpty() {
    const textListOfArtists = await this.artistsNameList.allTextContents()
    expect(textListOfArtists.length).toBeGreaterThan(0)
  }

  async checkPageStaticHeader() {
    await expect(this.staticPageHeader).toBeVisible()
  }

  async checkPageStaticFooter() {
    await this.staticPageFooter.scrollIntoViewIfNeeded()
    await expect(this.staticPageFooter).toBeVisible()
  }

  async goToRandomArtistPage() {
    const textListOfArtists = await this.artistsNameList.allTextContents()

    if (textListOfArtists.length === 0) {
      throw new Error('No artists found. The list is empty.')
    }

    const randomIndex = Math.floor(Math.random() * textListOfArtists.length)
    const randomArtistText = textListOfArtists[randomIndex]
    const randomArtistLocator = this.page.locator(`:text("${randomArtistText}")`)
    if (randomArtistLocator && randomArtistText) {
      const formattedArtistText = randomArtistText.toLowerCase().replace(/\s+/g, '-')
      await randomArtistLocator.click()
      const artistURLPattern = `**/artists/${formattedArtistText.toLowerCase()}`
      await this.page.waitForURL(artistURLPattern)
      await this.headingH1.waitFor({state: 'visible'})
      const nameFromH1 = await this.headingH1.textContent()
      expect(randomArtistText).toEqual(nameFromH1)
    } else {
      throw new Error('Random artist locator is undefined.')
    }
  }
}
