import {expect, test} from '@playwright/test'

import {defaults} from '../defaults'
import {TEST_EMAIL} from './constants/common.constants'
import {
  GTMUserSubscriptionFormStartedText,
  GTMUserSubscriptionFormViewText,
  GTMUserSubscriptionText,
} from './constants/gtm.constants'
import {HomePage} from './pages/home'
import GTMEventClass from './utils/gtmClass'

test(`GA4:subscribe event test`, async ({page}) => {
  await page.goto(defaults.baseURL)
  const homePage = new HomePage(page)
  const gtmEvent = new GTMEventClass(page)
  await homePage.goToPage()

  await test.step(`Emit GA4:${GTMUserSubscriptionFormViewText.event} event when clicking FooterNewsletterIconBtn in home page`, async () => {
    await page.getByRole('button', {name: 'Newsletter Icon'}).click()
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMUserSubscriptionFormViewText.event, ['event_data'])
    ).toContainEqual({
      ...GTMUserSubscriptionFormViewText,
      event_data: {
        cta_value: 'Newsletter',
        method: 'footer',
      },
    })
  })

  await test.step(`Emit GA4:${GTMUserSubscriptionFormStartedText.event} event when email field is started to insert`, async () => {
    await page.getByPlaceholder('Enter Your Email Address Here').fill(TEST_EMAIL)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMUserSubscriptionFormStartedText.event, ['event_data'])
    ).toContainEqual({
      ...GTMUserSubscriptionFormStartedText,
      event_data: {
        cta_value: 'Newsletter',
        method: 'footer',
        type: 'sales,books,news',
      },
    })
  })

  await test.step(`Emit GA4:${GTMUserSubscriptionText.event} event when clicking Sign Up Button is clicked`, async () => {
    await page.getByRole('button', {name: 'Sign Up'}).click()
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMUserSubscriptionText.event, [
        'event_data',
        'user_data',
      ])
    ).toContainEqual({
      ...GTMUserSubscriptionText,
      event_data: {
        cta_value: 'Newsletter',
        method: 'footer',
        type: 'sales,books,news',
      },
      user_data: {
        event_form_hashemail: Buffer.from(TEST_EMAIL).toString('base64'),
      },
    })
  })
})
