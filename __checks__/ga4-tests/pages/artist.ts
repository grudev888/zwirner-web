import {Locator, Page} from '@playwright/test'

import {defaults} from '../../defaults'

export class ArtistPage {
  readonly page: Page
  readonly cvDownloadLink: Locator

  constructor(page: Page) {
    this.page = page
    this.cvDownloadLink = page.getByRole('link', {name: 'Download Full CV'})
  }

  async goToPage(slug: string) {
    await this.page.goto(`${defaults.baseURL}/${slug}`)
  }

  async goToPageAndClickDownloadLink(slug: string) {
    await this.goToPage(slug)
    await this.cvDownloadLink.click()
  }
}

export default ArtistPage
