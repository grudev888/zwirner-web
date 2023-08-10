import {groq} from 'next-sanity'

import {componentsByDataScheme} from '@/sanity/queries/page.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

const exhibitionDateFields = groq`
  _id,
  title,
  "date": endDate
`

export const getEndDateExhibitionsDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`

export const exhibitionPageSlugs = groq`
*[_type == "exhibitionPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const exhibitionPageBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  ...,
  artists[]->,
  locations[]->,
  'checklistPDFURL': checklistPDF.asset->url,
  'pressReleasePDFURL': pressReleasePDF.asset->url,
  heroMedia {
    type,
    image {
      ...
      asset->
    }
  },
  seo {
    ${pageSEOFields}
  },
  ${componentsByDataScheme}
}`

export const installationViewsBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  title,
  subtitle,
  'showChecklist': count(checklist) > 0,
  slug,
  installationViewsInterstitial,
  installationViews,
  'seo':installationViewsSeo {
    ${pageSEOFields}
  }
}`

export const checklistBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  title,
  subtitle,
  'showChecklist': count(checklist) > 0,
  slug,
  checklistInterstitial,
  checklist[]->{..., artists[]->, 'image': image.asset->},
  'seo':checklistSeo {
    ${pageSEOFields}
  }
}`
