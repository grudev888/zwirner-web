import {SitemapResSchemaType} from '@/sanity/queries/sitemaps/typesData'

import {dateToLastmodFormat} from './dateToLastmodFormat'

export function generateXMLUrls(data: SitemapResSchemaType) {
  return data
    .map((el) => {
      return `
      <url>
          <loc>${`https://www.davidzwirner.com${el.params.slug}`}</loc>
          <lastmod>${dateToLastmodFormat(el.params.lastmod)}</lastmod>
      </url>
    `
    })
    .join('')
}
