import {expect, test} from '@playwright/test'

import {sanityFetch} from '../defaults'
import {GTMDownloadLinkText} from './constants/gtm.constants'
import {ArtistPage} from './pages/artist'
import {getFileInfo} from './utils/gtm.helper'
import GTMEventClass from './utils/gtmClass'

test(`Emit GA4:${GTMDownloadLinkText.event}  event when clicking GA4 Download Link`, async ({
  page,
}) => {
  const artistPage = new ArtistPage(page)
  const gtmEvent = new GTMEventClass(page)

  const ARTIST_PAGES: {
    cvUrl: string
    slug: string
  }[] = await sanityFetch(`
    *[_type == "artistPage"][0...5] {
      "cvUrl": artist->cv.asset->url,
      "slug": slug.current,
    }
  `)
  for (const {slug, cvUrl} of ARTIST_PAGES) {
    const [fileName, fileExtension] = getFileInfo(cvUrl)
    if (!fileName || !fileExtension) continue
    await artistPage.goToPageAndClickDownloadLink(slug)

    await expect(
      await gtmEvent.getFilteredDataLayer(GTMDownloadLinkText.event, ['event_data'])
    ).toContainEqual({
      ...GTMDownloadLinkText,
      event_data: {
        file_extension: fileExtension,
        file_name: fileName,
        identifier: 'Download Full CV',
      },
    })
  }
})
