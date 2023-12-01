import {test} from '@playwright/test'

import {NewsletterSignup} from './PO-pages/newsletter-signup-form'

test.describe.configure({mode: 'parallel', retries: 1})

test('Newsletter Signup: navigate to the Artist Listing page, click Subscribe button and verify newsletter form Ui', async ({
  page,
}) => {
  const newsletterSignup = new NewsletterSignup(page)
  await newsletterSignup.goToArtistListingPageAndClickSubscribeIconInFooter()
  await newsletterSignup.verifyNewsletterSignupFormUi()
})

test('Newsletter Signup: fill newlstter signup form with valid data (all checkboxes selected) and verify Sign Up button is enabled', async ({
  page,
}) => {
  const newsletterSignup = new NewsletterSignup(page)
  await newsletterSignup.goToArtistListingPageAndClickSubscribeIconInFooter()
  await newsletterSignup.fillNewsletterSignupWithValidData()
})

test('Newsletter Signup: fill newsletter signup form with Invalid data (all checkboxes unchecked), enter invalid email format, and verify Sugn Up button is disabled, proper inline errors are dislayed', async ({
  page,
}) => {
  const newsletterSignup = new NewsletterSignup(page)
  await newsletterSignup.goToArtistListingPageAndClickSubscribeIconInFooter()
  await newsletterSignup.fillNewsletterSignupWithInvalidData()
})

test('Newsletter Signup: verify links in Privacy policy section of the newsletter sign up form', async ({
  page,
}) => {
  const newsletterSignup = new NewsletterSignup(page)
  await newsletterSignup.goToArtistListingPageAndClickSubscribeIconInFooter()
  await newsletterSignup.verifyNewsletterFormPrivacyPolicyLinks()
})

test('Newsletter Signup: verify Sign Up button is enabled when valid email is entered and at least one preference sign up option is selected', async ({
  page,
}) => {
  const newsletterSignup = new NewsletterSignup(page)
  await newsletterSignup.goToArtistListingPageAndClickSubscribeIconInFooter()
  await newsletterSignup.verifySignUpPreferenceOptions()
})
