import {test} from '@playwright/test'

import {ArtistListingPage} from './PO-pages/artist-listing'

test.describe.configure({mode: 'parallel', retries: 1})

test('Verify Artist Listing Page: presence of single H1 element, Header, Footer, and successful page load (HTTP 200)"', async ({
  page,
}) => {
  const artistListingPage = new ArtistListingPage(page)
  await artistListingPage.waitForPageToLoadSuccessfully()
  await artistListingPage.checkPageStaticHeader()
  await artistListingPage.checkHeadingOfPage()
  await artistListingPage.checkArtistListIsNotEmpty()
  await artistListingPage.checkPageStaticFooter()
})

test('Go to random ADP from listing page and check the artist name from the list is the same as on the ADP page', async ({
  page,
}) => {
  const artistListingPage = new ArtistListingPage(page)
  await artistListingPage.waitForPageToLoadSuccessfully()
  await artistListingPage.checkArtistListIsNotEmpty()
  await artistListingPage.goToRandomArtistPage()
})
