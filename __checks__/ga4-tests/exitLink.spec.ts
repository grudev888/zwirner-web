import {expect, test} from '@playwright/test'

import {defaults} from '../defaults'
import {GTMExternalLinkText} from './constants/gtm.constants'
import {HomePage, SocialLinkName} from './pages/home'
import GTMEventClass from './utils/gtmClass'

const FOOTER_SOCIAL_LINKS: {name: SocialLinkName; link_url: string}[] = [
  {
    name: 'Twitter Icon',
    link_url: 'https://twitter.com/davidzwirner',
  },
  {
    name: 'Facebook Icon',
    link_url: 'https://www.facebook.com/davidzwirner',
  },
  {
    name: 'Instagram Icon',
    link_url: 'https://www.instagram.com/davidzwirner/',
  },
]

for (const {name, link_url} of FOOTER_SOCIAL_LINKS) {
  test(`Emit GA4:${GTMExternalLinkText.event} event when clicking on ${name} Social Link Button`, async ({
    page,
  }) => {
    await page.goto(defaults.baseURL)
    const homePage = new HomePage(page)
    const gtmEvent = new GTMEventClass(page)
    await homePage.clickToSocialLink(name)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMExternalLinkText.event, ['event_data'])
    ).toContainEqual({
      ...GTMExternalLinkText,
      event_data: {
        identifier: '',
        link_url,
      },
    })
  })
}
