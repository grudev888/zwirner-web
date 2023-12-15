import {type GetServerSidePropsContext} from 'next/types'

import {
  ARTISTS_AVAILABLE_WORKS_URL,
  ARTISTS_EXHIBITIONS_URL,
  ARTISTS_GUIDE_URL,
  ARTISTS_PRESS_URL,
  ARTISTS_SURVEY_URL,
} from '@/common/constants/commonCopies'
import {getAllArtistPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllArtistPageSlugsSitemap'
import {getAllAvailableArtworksPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllAvailableWorksPageSlugsSitemap'
import {getAllExhibitionsPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllExhibitionsPageSlugsSitemap'
import {getAllGuidePageSlugsSitemap} from '@/sanity/services/sitemaps/getAllGuidePageSlugsSitemap'
import {getAllPressPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllPressPageSlugsSitemap'
import {getAllSurveyPageSlugsSitemap} from '@/sanity/services/sitemaps/getAllSurveyPageSlugsSitemap'
import {getAllSurveySeriesSlugsSitemap} from '@/sanity/services/sitemaps/getAllSurveySeriesSlugsSitemap'
import {getArtistListingLastmod} from '@/sanity/services/sitemaps/getArtistListingLastmod'
import {generateXMLUrls} from '@/utils/string/generateXMLUrls'

/*
  Store there something simple / small.
  Currently contains:
  /artists
  /subscribe
  /artists/[slug]
  /artists/[slug]/survey
  /artists/[slug]/guide
  /artists/[slug]/press
  /artists/[slug]/exhibitions
  /artists/[slug]/available-artworks
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
  // artists/[slug]/guide
  const guides = await getAllGuidePageSlugsSitemap()
  const guidesDetailsList = guides.map(({params}) => ({
    params: {...params, slug: `${params.slug}${ARTISTS_GUIDE_URL}`},
  }))
  // artists/[slug]/press
  const press = await getAllPressPageSlugsSitemap()
  const pressDetailsList = press.map(({params}) => ({
    params: {...params, slug: `${params.slug}${ARTISTS_PRESS_URL}`},
  }))
  // artists/[slug]/exhibitions
  const exhibitions = await getAllExhibitionsPageSlugsSitemap()
  const exhibitionsDetailsList = exhibitions.map(({params}) => ({
    params: {...params, slug: `${params.slug}${ARTISTS_EXHIBITIONS_URL}`},
  }))
  // artists/[slug]/available-artworks
  const availableArtworks = await getAllAvailableArtworksPageSlugsSitemap()
  const availableArtworksDetailsList = availableArtworks.map(({params}) => ({
    params: {...params, slug: `${params.slug}${ARTISTS_AVAILABLE_WORKS_URL}`},
  }))
  // artists/[slug]/survey
  const surveys = await getAllSurveyPageSlugsSitemap()
  const surveysDetailsList = surveys.map(({params}) => ({
    params: {...params, slug: `${params.slug}${ARTISTS_SURVEY_URL}`},
  }))
  // artists/[slug]/survey/[series]
  const surveySeries = await getAllSurveySeriesSlugsSitemap()

  // We generate the XML sitemap with data
  const artistListingXMLUrls = generateXMLUrls(artistListingLastmod)
  const artistsXMLUrls = generateXMLUrls(artists)
  const guidesXMLUrls = generateXMLUrls(guidesDetailsList)
  const pressXMLUrls = generateXMLUrls(pressDetailsList)
  const exhibitionsXMLUrls = generateXMLUrls(exhibitionsDetailsList)
  const availableWorksXMLUrls = generateXMLUrls(availableArtworksDetailsList)
  const surveysXMLUrls = generateXMLUrls(surveysDetailsList)
  const surveySeriesXMLUrls = generateXMLUrls(surveySeries)

  const sitemap = generateSiteMap(
    artistListingXMLUrls,
    artistsXMLUrls,
    guidesXMLUrls,
    pressXMLUrls,
    exhibitionsXMLUrls,
    availableWorksXMLUrls,
    surveysXMLUrls,
    surveySeriesXMLUrls
  )

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
