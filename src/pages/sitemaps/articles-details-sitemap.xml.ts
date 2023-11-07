import {type GetServerSidePropsContext} from 'next/types'

import {getAllArticlePagesSlugsSitemap} from '@/sanity/services/sitemaps/getAllArticlePagesSlugsSitemap'
import {generateXMLUrls} from '@/utils/string/generateXMLUrls'

/*
  Currently contains:
  /news/[year]/[slug]
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
  // We make an API call to gather the URLs for our site
  // articles details
  const articles = await getAllArticlePagesSlugsSitemap()
  const articlesDetailsList = articles.filter(
    (item) => item.params.slug.includes('/news/') && item.params.showInSitemap
  )

  // We generate the XML sitemap with data
  const articlesXMLUrls = generateXMLUrls(articlesDetailsList)

  const sitemap = generateSiteMap(articlesXMLUrls)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
