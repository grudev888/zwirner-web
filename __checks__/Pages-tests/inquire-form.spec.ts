import {test} from '@playwright/test'

import {InquireForm} from './PO-pages/inquire-form'

test.describe.configure({mode: 'parallel', retries: 1})

test('Inquire Form: navigate to random artist details page and click inquire button in the header sub-menu, verify the form UI and URL', async ({
  page,
}) => {
  const inquireForm = new InquireForm(page)
  await inquireForm.goToArtistDtlPageAndClickInquireBtn()
  await inquireForm.verifyHeaderOfInqFormFromAdpPage()
  await inquireForm.verifyInquireFormUi()
  await inquireForm.verifyInqFormUrlOpenedFromAdpPage()
})

test('Inquire Form: fill the form with valid data and verify that Inquire button on Inquire form is enabled', async ({
  page,
}) => {
  const inquireForm = new InquireForm(page)
  await inquireForm.goToArtistDtlPageAndClickInquireBtn()
  await inquireForm.fillInquireFormWithValidData()
})

test('Inquire Form: fill input fileds with invalid data format and verify inline errors are displayed', async ({
  page,
}) => {
  const inquireForm = new InquireForm(page)
  await inquireForm.goToArtistDtlPageAndClickInquireBtn()
  await inquireForm.fillInquireFormWithInvalidDataFormat()
})

test('Inquire Form: verify link accessability in privacy policy form section', async ({page}) => {
  const inquireForm = new InquireForm(page)
  await inquireForm.goToArtistDtlPageAndClickInquireBtn()
  await inquireForm.verifyLinksFromPrivacyPolicySection()
})
