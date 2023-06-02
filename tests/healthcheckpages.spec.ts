import {expect, test} from '@playwright/test'

test('Check homepage is up', async ({page}) => {
  const response = await page.request.get('/')
  await expect(response).toBeOK()
})

test('Check available artworks is up', async ({page}) => {
  const response = await page.request.get('/available-artworks')
  await expect(response).toBeOK()
})
