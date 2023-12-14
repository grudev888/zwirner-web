import {groq} from 'next-sanity'

import {allSurveySeriesPageSlugsBaseQuery} from '../artists/allSurveySeriesPageSlugs'

/**
 * GROQ query explanation
 *
 * "surveySeriesSlugs": surveySeries[]->{ _id, 'slug':slug.current, 'lastmod': _updatedAt, seo }
 * - Iterate over each surveySeries item and return slug, lastmod, and seo
 *
 * }.surveySeriesSlugs[]
 * - Items were grouped by artistPage. This will unwind surveySeriesSlugs and return an array of Series
 *
 *
 * [seo.robotsNoIndex == false]{
 *   "params": { slug, lastmod }
 * }
 * - Filter out any items that have seo.robotsNoIndex == true and return an object with slug and lastmod
 *
 */
export const allSurveySeriesPageSlugsSitemap = groq`
  ${allSurveySeriesPageSlugsBaseQuery}{
    "surveySeriesSlugs": surveySeries[]->{ 'slug':slug.current, 'lastmod': _updatedAt, seo }
  }.surveySeriesSlugs[][seo.robotsNoIndex == false]{
    "params": { slug, lastmod }
  }
`
