import {Page} from '@playwright/test'

import {defaults} from '../../defaults'

export class AvailableArtworksPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goToPage() {
    await this.page.goto(`${defaults.baseURL}/available-artworks`)
  }
}

export default AvailableArtworksPage
