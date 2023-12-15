import {test} from '@playwright/test'

import {ArtworkDetailPage} from './PO-pages/artwork-detail'

test.describe.configure({mode: 'parallel', retries: 1})

test.skip('Verify Artwork Detail Page: presence of single H1 element, Header, Footer, and successful page load (HTTP 200)', async ({
  page,
}) => {
  const artworkDetailPage = new ArtworkDetailPage(page)
  await artworkDetailPage.navigateToArtworkDtlPageAndCheckResponse(page)
  await artworkDetailPage.checkHeadingOfPage()
  await artworkDetailPage.checkPageStaticHeader()
  await artworkDetailPage.checkPageStaticFooter()
})
