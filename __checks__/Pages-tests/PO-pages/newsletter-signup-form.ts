import {expect, Locator, Page} from '@playwright/test'

import {defaults} from '../../defaults'
import {testData} from '../../Pages-tests/testData'

export class NewsletterSignup {
  readonly page: Page
  readonly artListPageURL: string
  readonly subscribeIconInFooter: Locator
  readonly newsletterForm: Locator
  readonly newsletterFormMainHeader: Locator
  readonly newsletterFormSubHeader: Locator
  readonly newsletterFormEmailInput: Locator
  readonly newsletterCheckboxUpdates: Locator
  readonly newsletterCheckboxFirstAccess: Locator
  readonly newsletterCheckboxDavidZwirner: Locator
  readonly newsletterPrivacyPolicyText: Locator
  readonly newsletterSignUpButton: Locator
  readonly newsletterSignUpCloseIcon: Locator
  readonly newsletterEmailInlineError: Locator
  readonly newsletterPreferenceinlineError: Locator
  readonly newsletterPrivacyPolicyLink: Locator
  readonly newsletterTermsAndConditionsLink: Locator
  readonly newsletterGooglePrivacyPolicyLink: Locator
  readonly newsletterGoogleTermsOfServiceLink: Locator
  readonly testEmailValid: string
  readonly testEmailInvalid: string

  constructor(page: Page) {
    this.page = page
    this.artListPageURL = '/artists'
    this.subscribeIconInFooter = page.getByRole('button', {name: 'Newsletter Icon'})
    this.newsletterForm = page.locator('#newsletterForm')
    this.newsletterFormMainHeader = this.newsletterForm
      .getByRole('paragraph')
      .getByText('Want to Know')
    this.newsletterFormSubHeader = this.newsletterForm
      .getByRole('paragraph')
      .getByText('Join our mailing list')
    this.newsletterFormEmailInput = this.newsletterForm.getByPlaceholder(
      'Enter your Email Address here'
    )
    this.newsletterCheckboxUpdates = this.newsletterForm.getByRole('checkbox', {
      name: 'Updates on Artists',
    })
    this.newsletterCheckboxFirstAccess = this.newsletterForm.getByRole('checkbox', {
      name: 'First access to',
    })
    this.newsletterCheckboxDavidZwirner = this.newsletterForm.getByRole('checkbox', {
      name: 'David Zwirner Books Releases and Events',
    })
    this.newsletterPrivacyPolicyText = this.newsletterForm
      .getByRole('paragraph')
      .filter({hasText: 'By sharing your email you agree to our'})
    this.newsletterSignUpButton = this.newsletterForm.getByRole('button', {name: 'Sign Up'})
    this.newsletterSignUpCloseIcon = this.page.getByText('Close IconClose')
    this.newsletterEmailInlineError = this.newsletterForm.getByText(
      'Please enter a valid email address.'
    )
    this.newsletterPreferenceinlineError = this.newsletterForm.getByText(
      'Please select at least one preference'
    )
    this.newsletterPrivacyPolicyLink = this.newsletterForm
      .getByRole('link', {name: 'Privacy Policy'})
      .first()
    this.newsletterTermsAndConditionsLink = this.newsletterForm.getByRole('link', {
      name: 'Terms and Conditions',
    })
    this.newsletterGooglePrivacyPolicyLink = this.newsletterForm
      .getByRole('link', {name: 'Privacy Policy'})
      .nth(1)
    this.newsletterGoogleTermsOfServiceLink = this.newsletterForm.getByRole('link', {
      name: 'Terms of Service',
    })
    this.testEmailValid = testData.validEmail
    this.testEmailInvalid = testData.invalidEmail
  }

  async goToArtistListingPageAndClickSubscribeIconInFooter() {
    await this.page.goto(defaults.baseURL + this.artListPageURL, {waitUntil: 'load'})
    await this.subscribeIconInFooter.click()
    await this.page.waitForSelector('#newsletterForm')
    await expect(this.newsletterForm).toBeVisible()
  }

  async verifyNewsletterSignupFormUi() {
    await expect(this.newsletterFormMainHeader).toBeVisible()
    await expect(this.newsletterFormSubHeader).toBeVisible()
    await expect(this.newsletterFormEmailInput).toBeVisible()
    await expect(this.newsletterCheckboxUpdates).toBeVisible()
    await expect(this.newsletterCheckboxFirstAccess).toBeVisible()
    await expect(this.newsletterCheckboxDavidZwirner).toBeVisible()
    await expect(this.newsletterPrivacyPolicyText).toBeVisible()
    await expect(this.newsletterSignUpButton).toBeVisible()
    await expect(this.newsletterSignUpCloseIcon).toBeVisible()
    await this.newsletterSignUpCloseIcon.click()
  }

  async fillNewsletterSignupWithValidData() {
    await expect(this.newsletterCheckboxUpdates).toBeChecked()
    await expect(this.newsletterCheckboxFirstAccess).toBeChecked()
    await expect(this.newsletterCheckboxDavidZwirner).toBeChecked()
    await expect(this.newsletterSignUpButton).toBeDisabled()
    await this.newsletterFormEmailInput.fill(this.testEmailValid)
    await expect(this.newsletterSignUpButton).toBeEnabled()
  }

  async fillNewsletterSignupWithInvalidData() {
    await this.newsletterFormEmailInput.fill(this.testEmailInvalid)
    await this.newsletterCheckboxUpdates.uncheck({force: true})
    await this.newsletterCheckboxFirstAccess.uncheck({force: true})
    await this.newsletterCheckboxDavidZwirner.uncheck({force: true})
    await expect(this.newsletterPreferenceinlineError).toBeVisible()
    await expect(this.newsletterEmailInlineError).toBeVisible()
    await expect(this.newsletterSignUpButton).toBeDisabled()
  }

  async verifyNewsletterFormPrivacyPolicyLinks() {
    const linksToClick = [
      this.newsletterPrivacyPolicyLink,
      this.newsletterTermsAndConditionsLink,
      this.newsletterGooglePrivacyPolicyLink,
      this.newsletterGoogleTermsOfServiceLink,
    ]
    const visitedUrls: string[] = []
    for (const linkLocator of linksToClick) {
      await linkLocator.click()
      const newTab = await this.page.waitForEvent('popup')
      if (newTab) {
        await newTab.waitForLoadState('domcontentloaded')
        const url = newTab.url()
        visitedUrls.push(url)
        await newTab.close()
      } else {
        throw new Error('New tab is null or undefined.')
      }
      await this.page.bringToFront()
    }
    for (const url of visitedUrls) {
      expect(url).not.toEqual('')
    }
  }

  async verifySignUpPreferenceOptions() {
    await this.newsletterFormEmailInput.fill(this.testEmailValid)
    await this.newsletterCheckboxUpdates.uncheck({force: true})
    await this.newsletterCheckboxFirstAccess.uncheck({force: true})
    await this.newsletterCheckboxDavidZwirner.uncheck({force: true})
    await expect(this.newsletterSignUpButton).toBeDisabled()
    await expect(this.newsletterPreferenceinlineError).toBeVisible()
    await this.newsletterCheckboxFirstAccess.check({force: true})
    await expect(this.newsletterPreferenceinlineError).not.toBeVisible()
    await expect(this.newsletterSignUpButton).toBeEnabled()
  }
}
