import {test} from '@playwright/test'

import {sanityFetch} from '../defaults'
import ArtistPage from './pages/artist'
import ArtworkPage from './pages/artwork'
import AvailableArtworksPage from './pages/available-artworks'
import ExhibitionPage from './pages/exhibition'
import {availableArtworksQuery} from './sanity/queries/available-artworks.queries'
import {exhibitionQuery} from './sanity/queries/exhibition.queries'
import {artworkHavingInquireCTAInArtistPage} from './sanity/services/artist.service'
import {artworkHavingInquireCTA} from './sanity/services/artwork.service'
import GTMEventClass from './utils/gtmClass'

test.skip(`GA4:Inquiry event test in /artists/[slug] page`, async ({page}) => {
  const artwork: any = await artworkHavingInquireCTAInArtistPage()

  if (!artwork) throw new Error('Could not find artwork having inquire CTA')

  const artistPage = new ArtistPage(page)
  const gtmEvent = new GTMEventClass(page)
  await artistPage.goToPage(artwork.artistPages[0].slug.current)
  await gtmEvent.checkInquiryFormInCard(artwork)
})

test.skip(`GA4:Inquiry event test in /artworks/[slug] page`, async ({page}) => {
  const artwork: any = await artworkHavingInquireCTA()

  if (!artwork) throw new Error('Could not find artwork having inquire CTA')

  const artworkPage = new ArtworkPage(page)
  await artworkPage.goToPage(artwork.slug.current)
  await artworkPage.checkInquiryForm(artwork)
})

test.skip(`GA4:Inquiry event test in /available-artworks page`, async ({page}) => {
  const availableArtworksData: any = await sanityFetch(availableArtworksQuery)

  const artwork: any = availableArtworksData.artworksGrid.grid.find(
    (grid: any) =>
      grid.content.artworkCTA?.CTA == 'inquire' ||
      grid.content.artworkCTA?.secondaryCTA == 'inquire'
  )?.content

  if (!artwork) throw new Error('Could not find artwork having inquire CTA')

  const availableArtworksPage = new AvailableArtworksPage(page)
  const gtmEvent = new GTMEventClass(page)
  await availableArtworksPage.goToPage()
  await gtmEvent.checkInquiryFormInCard(artwork)
})

test.skip(`GA4:Inquiry event test in /exhibitions/[year]/[slug]`, async ({page}) => {
  const exhibitionPage = new ExhibitionPage(page)
  const gtmEvent = new GTMEventClass(page)
  const exhibitionData: any = await sanityFetch(exhibitionQuery)
  await exhibitionPage.goToPage(exhibitionData.slug.current)
  await gtmEvent.checkInquiryFormInCard()
})
