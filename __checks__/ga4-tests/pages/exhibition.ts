import {Page} from '@playwright/test'

import {defaults} from '../../defaults'

export class ExhibitionPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goToPage(slug: string) {
    await this.page.goto(`${defaults.baseURL}${slug}`)
  }
}
export default ExhibitionPage
