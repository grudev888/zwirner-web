import {test} from '@playwright/test'

import {ArtistDetailsPage} from './PO-pages/artist-detail'

test.describe.configure({mode: 'parallel', retries: 1})

test('Verify Artist Details Page: presence of single H1 element, Header, Footer, and successful page load (HTTP 200)', async ({
  page,
}) => {
  const artistDetailsPage = new ArtistDetailsPage(page)
  await artistDetailsPage.navigateToArtistDtlPageAndCheckResponse(page)
  await artistDetailsPage.checkHeadingOfPage()
  await artistDetailsPage.checkPageStaticHeader()
  await artistDetailsPage.checkPageStaticFooter()
})
