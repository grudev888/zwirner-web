import {type GetServerSidePropsContext} from 'next/types'

import {env} from '@/env.mjs'
import {getAllArtworkSlugsSitemap} from '@/sanity/services/sitemaps/getAllArtworkSlugsSitemap'
import {generateXMLUrls} from '@/utils/string/generateXMLUrls'

/*
  Currently contains:
  /artworks/[slug]
*/

function generateSiteMap(...args: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${args.flat().join('')}
  </urlset>
`
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({res}: GetServerSidePropsContext) {
  if (
    env.NEXT_PUBLIC_VERCEL_ENV !== 'production' &&
    env.NEXT_PUBLIC_SANITY_DATASET !== 'production-v1'
  ) {
    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(generateSiteMap(''))
    res.end()

    return {
      props: {},
    }
  }
  // We make an API call to gather the URLs for our site
  // artwork details
  const artworks = await getAllArtworkSlugsSitemap()
  // We generate the XML sitemap with data
  const artworksXMLUrls = generateXMLUrls(artworks)

  const sitemap = generateSiteMap(artworksXMLUrls)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
