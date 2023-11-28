import {defaults} from './defaults'
import {expect, test} from './fixtures/base'

const PAGES = ['/artists']

test.describe('Check headings', () => {
  test.afterEach(async ({page}) => {
    await expect(page.getByRole('heading', {level: 1})).toBeVisible()
  })

  PAGES.forEach((pagePath) =>
    test(`on ${pagePath}`, async ({page}) => {
      await page.goto(defaults.baseURL + pagePath)
    })
  )
})
