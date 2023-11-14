import {type GetServerSidePropsContext} from 'next/types'

import {env} from '@/env.mjs'

const devResponse = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>
`

function generateSiteMap() {
  // Manualy add links to sitemaps
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://www.davidzwirner.com/sitemaps/common-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.davidzwirner.com/sitemaps/articles-details-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.davidzwirner.com/sitemaps/artwork-details-sitemap.xml</loc>
    </sitemap>
  </sitemapindex>
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
    res.write(devResponse)
    res.end()

    return {
      props: {},
    }
  }

  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
