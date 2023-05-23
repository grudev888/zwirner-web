import {test, expect} from '@playwright/test'

test('has title', async ({page}) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Default Title for every page | David Zwirner')
})

test('David Zwirner link', async ({page}) => {
  await page.goto('/')

  // Click the get started link.
  await page.getByRole('link', {name: 'David Zwirner'}).click()

  // Expects the URL to be home
  await expect(page).toHaveURL('/')
})
