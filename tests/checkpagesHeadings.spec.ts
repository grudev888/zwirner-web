import {expect, test} from '@playwright/test'

test('Check h1 on available-works', async ({page}) => {
  await page.goto('/available-artworks')
  await expect(page.getByRole('heading', {level: 1})).toBeVisible()
})
