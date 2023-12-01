import {expect, Locator, Page} from '@playwright/test'

import {defaults} from '../../defaults'
import {testData} from '../testData'

export class InquireForm {
  readonly page: Page
  readonly headingH1: Locator
  readonly artistsNameList: Locator
  readonly artListPageURL: string
  readonly inquireBtn: any
  readonly inquireForm: Locator
  readonly inquireFormLearnAboutHeaderText: Locator
  readonly inquireFormHeaderTitle: Locator
  readonly inquireArtworkFormHeaderTitle: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailAddressInput: Locator
  readonly phoneNumberInput: Locator
  readonly comentsSectionInput: Locator
  readonly privacyPolicyText: Locator
  readonly inquireFormButton: Locator
  readonly testFirstName: string
  readonly testLastName: string
  readonly testEmailValid: string
  readonly testPhoneNumberValid: string
  readonly testEmailInvalid: string
  readonly testPhoneNumberInvalid: string
  readonly testComment: string
  readonly closeFormIcon: Locator
  readonly emailInlineError: Locator
  readonly firstNameInlineError: Locator
  readonly lastNameInlineError: Locator
  readonly phoneNuminlineError: Locator
  readonly privacyPolicyLink: Locator
  readonly termsAndConditionsLink: Locator
  readonly googlePrivPolicylink: Locator
  readonly termsOfServiceLink: Locator

  constructor(page: Page) {
    this.page = page
    this.artistsNameList = page
      .locator('#options-container')
      .getByRole('list')
      .getByRole('listitem')
    this.artListPageURL = '/artists'
    this.inquireBtn = page.getByRole('button', {name: 'Inquire'}).first()
    this.inquireForm = page.locator('#inquiryForm')
    this.headingH1 = page.getByRole('heading', {level: 1})
    this.inquireFormLearnAboutHeaderText = page
      .locator('#inquiryForm p')
      .filter({hasText: 'To learn more'})
    this.inquireFormHeaderTitle = page.locator('#inquiryForm p').filter({hasText: 'Inquire'})
    this.firstNameInput = page.getByPlaceholder('First Name')
    this.lastNameInput = page.getByPlaceholder('Last Name')
    this.emailAddressInput = page.getByPlaceholder('Email Address')
    this.phoneNumberInput = page.getByPlaceholder('Phone Number')
    this.comentsSectionInput = page.getByPlaceholder('Comments & Additional Interests')
    this.privacyPolicyText = page
      .locator('#inquiryForm p')
      .filter({hasText: 'By sharing your email'})
    this.inquireFormButton = page.locator('#inquiryForm').getByRole('button', {name: 'Inquire'})
    this.testFirstName = testData.firstName
    this.testLastName = testData.lastName
    this.testEmailValid = testData.validEmail
    this.testPhoneNumberValid = testData.validPhoneNumber
    this.testEmailInvalid = testData.invalidEmail
    this.testPhoneNumberInvalid = testData.invalidPhoneNumber
    this.testComment = testData.comment
    this.closeFormIcon = page.getByRole('img', {name: 'Close Icon'})
    this.emailInlineError = page.getByText('Please enter a valid email address.')
    this.firstNameInlineError = page.getByText('First Name is required.')
    this.lastNameInlineError = page.getByText('Last Name is required.')
    this.phoneNuminlineError = page.getByText('Invalid phone format')
    this.privacyPolicyLink = page.getByRole('link', {name: 'Privacy Policy'}).first()
    this.termsAndConditionsLink = page
      .locator('#inquiryForm')
      .getByRole('link', {name: 'Terms and Conditions'})
    this.googlePrivPolicylink = page.getByRole('link', {name: 'Privacy Policy'}).nth(1)
    this.termsOfServiceLink = page.getByRole('link', {name: 'Terms of Service'})
    this.inquireArtworkFormHeaderTitle = page
      .locator('#inquiryForm p')
      .filter({hasText: 'Interested in'})
  }

  async goToArtistDtlPageAndClickInquireBtn() {
    await this.page.goto(defaults.baseURL + this.artListPageURL, {waitUntil: 'load'})
    const textListOfArtists = await this.artistsNameList.allTextContents()
    if (textListOfArtists.length === 0) {
      throw new Error('No artists found. The list is empty.')
    }
    const randomIndex = Math.floor(Math.random() * textListOfArtists.length)
    const randomArtistText = textListOfArtists[randomIndex]
    const randomArtistLocator = this.page.locator(`:text("${randomArtistText}")`)
    await randomArtistLocator.click()
    await this.page.waitForURL('**/artists/**')
    await this.page.waitForTimeout(200)
    await expect(this.headingH1).toBeVisible()
    const artistName = await this.headingH1.textContent()
    await this.page.waitForTimeout(200)
    await this.inquireBtn.click()
    await this.inquireForm.waitFor({state: 'visible'})
    const artistNameOnInquireForm = await this.inquireFormLearnAboutHeaderText.textContent()
    expect(artistNameOnInquireForm).toContain(artistName)
  }

  async verifyInquireFormUi() {
    await expect(this.firstNameInput).toBeEnabled()
    await expect(this.lastNameInput).toBeEnabled()
    await expect(this.emailAddressInput).toBeEnabled()
    await expect(this.phoneNumberInput).toBeEnabled()
    await expect(this.comentsSectionInput).toBeEnabled()
    await expect(this.privacyPolicyText).toBeVisible()
    await expect(this.closeFormIcon).toBeVisible()
    await expect(this.inquireFormButton).toBeVisible()
    await expect(this.inquireFormButton).toBeDisabled()
  }

  async verifyHeaderOfInqFormFromAdpPage() {
    await expect(this.inquireFormHeaderTitle).toBeVisible()
    await expect(this.inquireFormLearnAboutHeaderText).toBeVisible()
  }

  async fillInquireFormWithValidData() {
    await this.firstNameInput.fill(this.testFirstName)
    await this.lastNameInput.fill(this.testLastName)
    await this.emailAddressInput.fill(this.testEmailValid)
    await this.phoneNumberInput.fill(this.testPhoneNumberValid)
    await this.comentsSectionInput.fill(this.testComment)
    await expect(this.inquireFormButton).toBeEnabled()
  }

  async fillInquireFormWithInvalidDataFormat() {
    await this.firstNameInput.click()
    await this.lastNameInput.click()
    await this.emailAddressInput.fill(this.testEmailInvalid)
    await this.phoneNumberInput.fill(this.testPhoneNumberInvalid)
    await this.comentsSectionInput.click()
    await expect(this.firstNameInlineError).toBeVisible()
    await expect(this.lastNameInlineError).toBeVisible()
    await expect(this.emailInlineError).toBeVisible()
    await expect(this.phoneNuminlineError).toBeVisible()
    await expect(this.inquireFormButton).toBeDisabled()
  }

  async verifyLinksFromPrivacyPolicySection() {
    const linksToClick = [
      this.privacyPolicyLink,
      this.googlePrivPolicylink,
      this.termsAndConditionsLink,
      this.termsOfServiceLink,
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

  async verifyInqFormUrlOpenedFromAdpPage() {
    const inquireFormUrl = this.page.url()
    expect(inquireFormUrl).toContain('#inquire')
  }
}
