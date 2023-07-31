import {expect, test} from '../playwright/fixtures/base'

const PAGES = [
  '/',
  '/available-artworks',
  '/utopia-editions',
  '/consignments',
  '/collect',
  '/artists/ruth-asawa',
  '/artists/ruth-asawa/available-works',
  '/artists/ruth-asawa/exhibitions',
  '/artists/ruth-asawa/guide',
  '/artists/ruth-asawa/press',
  '/artists/ruth-asawa/survey',
]

test.describe('Check headings', () => {
  test.afterEach(async ({page}) => {
    await expect(page.getByRole('heading', {level: 1})).toBeVisible()
  })

  PAGES.forEach((pagePath) =>
    test(`on ${pagePath}`, async ({page}) => {
      await page.goto(pagePath)
    })
  )
})
