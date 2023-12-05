import {Page} from '@playwright/test'

import {defaults} from '../../defaults'

export type SocialLinkName = 'Twitter Icon' | 'Facebook Icon' | 'Instagram Icon'

export class HomePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goToPage() {
    await this.page.goto(defaults.baseURL)
  }

  async clickToSocialLink(name: SocialLinkName) {
    await this.page.getByRole('link', {name}).click()
  }
}
export default HomePage
