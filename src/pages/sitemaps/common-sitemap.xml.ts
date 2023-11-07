import {type GetServerSidePropsContext} from 'next/types'

import {getAllArtistPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllArtistPageSlugsSitemap'
import {getArtistListingLastmod} from '@/sanity/services/sitemaps/getArtistListingLastmod'
import {generateXMLUrls} from '@/utils/string/generateXMLUrls'

/*
  Store there something simple / small.
  Currently contains:
  /artists
  /subscribe
  /artists/[slug]
*/

function generateSiteMap(...args: string[]) {
  // Manualy add general pages
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.davidzwirner.com/subscribe</loc>
    </url>
    ${args.flat().join('')}
  </urlset>
`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
  // We make an API call to gather the URLs for our site
  const artistListingLastmod = await getArtistListingLastmod()

  // artists details
  const artists = await getAllArtistPageSlugsSitemap()
  const artistToShowInSitemap = artists.filter((data) => data.params.showInSitemap)
  // We generate the XML sitemap with data
  const artistsXMLUrls = generateXMLUrls(artistToShowInSitemap)
  const artistListingXMLUrls = generateXMLUrls(artistListingLastmod)

  const sitemap = generateSiteMap(artistListingXMLUrls, artistsXMLUrls)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
