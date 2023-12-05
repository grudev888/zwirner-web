import {expect, test} from '@playwright/test'

import {sanityFetch} from '../defaults'
import {GTMProductListingViewedText, GTMProductViewText} from './constants/gtm.constants'
import {
  ARTISTS_SECTION,
  ARTWORKS_SECTION,
  AVAILABLE_ARTWORKS_SECTION,
  EXHIBITIONS_SECTION,
} from './constants/section.constants'
import ArtistPage from './pages/artist'
import ArtworkPage from './pages/artwork'
import AvailableArtworksPage from './pages/available-artworks'
import {artistArtworks} from './sanity/queries/artist.queries'
import {artworkDatasQuery} from './sanity/queries/artwork.queries'
import {availableArtworkDatasQuery} from './sanity/queries/available-artworks.queries'
import {exhibitionQuery} from './sanity/queries/exhibition.queries'
import {mapEcommerceData} from './utils/gtm.helper'
import GTMEventClass from './utils/gtmClass'

test(`Emit GA4:${GTMProductViewText.event} event when artwork detail page is loaded`, async ({
  page,
}) => {
  const artworkPage = new ArtworkPage(page)
  const gtmEvent = new GTMEventClass(page)

  const ARTWORK_PAGES: any = await sanityFetch(artworkDatasQuery)

  for (const artwork of ARTWORK_PAGES) {
    await artworkPage.goToPage(artwork.slug.current)
    await page.waitForFunction(() => window?.dataLayer)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMProductViewText.event, ['ecommerce'])
    ).toContainEqual({
      ...GTMProductViewText,
      ecommerce: mapEcommerceData(
        artwork,
        {
          title: artwork?.pageTitle,
          section: ARTWORKS_SECTION,
          hash: artwork?._rev,
        },
        {
          currency: true,
          items: {item_list_id: true, item_list_name: true, price: true},
        }
      ),
    })
  }
})
// TODO: can't catch window.datalayer because when clicking, select_item event is emited and window.datalayer is re-assigned to []
// test(`Emit GA4:${GTMProductListingClickedText.event} event when clicking artwork card in available-artworks page`, async ({
//   page,
// }) => {
// })

test(`Emit GA4:${GTMProductListingViewedText.event} event when clicking artwork card in /available-artworks`, async ({
  page,
}) => {
  const availableArtworkPage = new AvailableArtworksPage(page)
  const gtmEvent = new GTMEventClass(page)

  const AV_ARTWORK_DATAS: any = await sanityFetch(availableArtworkDatasQuery)
  if (!AV_ARTWORK_DATAS) console.log("there isn't any test artwroks")

  for (const grid of AV_ARTWORK_DATAS?.artworksGrid?.grid) {
    const artwork = grid?.content[0]
    await availableArtworkPage.goToPage()
    await page
      .getByRole('link', {
        name: artwork.photos[0].image.alt,
      })
      .focus()
    await page.waitForFunction(
      (artwork) =>
        window?.dataLayer.some(
          (layer: any) => layer?.ecommerce?.items[0]?.item_id === artwork.inventoryId
        ),
      artwork
    )
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMProductListingViewedText.event, ['ecommerce'])
    ).toContainEqual({
      ...GTMProductListingViewedText,
      ecommerce: mapEcommerceData(
        artwork,
        {
          title: AV_ARTWORK_DATAS?.pageTitle,
          section: AVAILABLE_ARTWORKS_SECTION,
          hash: AV_ARTWORK_DATAS?._rev,
        },
        {
          item_list_id: true,
          item_list_name: true,
        }
      ),
    })
  }
})

test(`Emit GA4:${GTMProductListingViewedText.event} event when clicking artwork card in /artists/[artist slug] page`, async ({
  page,
}) => {
  const artistPage = new ArtistPage(page)
  const gtmEvent = new GTMEventClass(page)

  const ARTIST_ARTWORK_DATAS: any = await sanityFetch(artistArtworks)
  if (!ARTIST_ARTWORK_DATAS) return console.log("there isn't any test artwroks")

  for (const grid of ARTIST_ARTWORK_DATAS?.survey?.dzCarousel) {
    const artwork = grid?.content[0]
    await artistPage.goToPage(ARTIST_ARTWORK_DATAS.slug.current)
    await page
      .getByRole('link', {
        name: artwork.photos[0].image.alt,
      })
      .focus()
    await page.waitForFunction(() => window?.dataLayer)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMProductListingViewedText.event, ['ecommerce'])
    ).toContainEqual({
      ...GTMProductListingViewedText,
      ecommerce: mapEcommerceData(
        artwork,
        {
          title: ARTIST_ARTWORK_DATAS?.pageTitle,
          section: ARTISTS_SECTION,
          hash: ARTIST_ARTWORK_DATAS?._rev,
        },
        {
          item_list_id: true,
          item_list_name: true,
        }
      ),
    })
  }
})

test(`Emit GA4:${GTMProductListingViewedText.event} event when clicking artwork card in /exhibitions/[year]/[exhibition slug]/checklist page`, async ({
  page,
}) => {
  const availableArtworkPage = new AvailableArtworksPage(page)
  const gtmEvent = new GTMEventClass(page)

  const EXHIBITION_ARTWORK_DATAS: any = await sanityFetch(exhibitionQuery)
  if (!EXHIBITION_ARTWORK_DATAS?.checklist?.grid)
    return console.log("there isn't any test artwroks")

  for (const grid of EXHIBITION_ARTWORK_DATAS?.checklist?.grid) {
    const artwork = grid?.content[0]
    await availableArtworkPage.goToPage()
    await page
      .getByRole('link', {
        name: artwork.photos[0].image.alt,
      })
      .focus()
    await page.waitForFunction(() => window?.dataLayer)
    await expect(
      await gtmEvent.getFilteredDataLayer(GTMProductListingViewedText.event, ['ecommerce'])
    ).toContainEqual({
      ...GTMProductListingViewedText,
      ecommerce: mapEcommerceData(
        artwork,
        {
          title: EXHIBITION_ARTWORK_DATAS?.pageTitle,
          section: EXHIBITIONS_SECTION,
          hash: EXHIBITION_ARTWORK_DATAS?._rev,
        },
        {
          item_list_id: true,
          item_list_name: true,
        }
      ),
    })
  }
})
