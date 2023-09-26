import {groq} from 'next-sanity'

import {
  dzEditorialFields,
  dzGridFields,
  dzInterstitialFields,
} from '@/sanity/queries/components.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'
import {componentsByDataScheme} from '@/sanity/queries/page.queries'
import {pageBuilderComponentsData} from '@/sanity/queries/page.queries'
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
  'showChecklist': count(checklist) > 0,
  slug,
  'checklistPDFURL': checklistPDF.asset->url,
  'pressReleasePDFURL': pdf.asset->url,
  heroMedia {
    ${mediaBuilder}
  },
  pressRelease {
    ${dzEditorialFields}
  },
  interstitial {
    ${dzInterstitialFields}
  },
  seo {
    ${pageSEOFields}
  },
  exploreContent[]{
    ${pageBuilderComponentsData}
  },

  ${componentsByDataScheme}
}`

export const installationViewsBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  title,
  subtitle,
  'showChecklist': count(checklist) > 0,
  slug,
  installationViewsInterstitial{
    ${dzInterstitialFields}
  },
  installationViews {
    ${dzGridFields}
  },
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
  checklistInterstitial {
    ${dzInterstitialFields}
  },
  checklist {
    ${dzGridFields}
  },
  'seo':checklistSeo {
    ${pageSEOFields}
  }
}`

export const exhibitionsLanding = groq`
*[_type == "exhibitionsLanding"][0] {
  title,
  introContent[]{
    ${pageBuilderComponentsData}
  },
  seo {
    ${pageSEOFields}
  },
  interstitial {
    ...,
    image{${mediaBuilder}},
  }
}
`

export const exhibitionsLandingData = groq`
  {
    'cities': array::unique(*[_type == "location"].address.city),
    'pageBuilder': *[_type == "exhibitionsLanding"][0] {
      introContent[]{
        ${pageBuilderComponentsData}
      },
    },
    'interstitial': *[_type == "exhibitionsLanding"][0] {
      ...interstitial {
        ...,
        image{${mediaBuilder}},
      }
    },
    'museumHighlights': *[_type == "exhibitionsLanding"][0] { museumHighlights[]-> }.museumHighlights,
    'upcomingExhibitionsComponent': *[_type == "exhibitionsLanding"][0] {upcomingExhibitionsComponent}.upcomingExhibitionsComponent,
    'exhibitions': *[_type == 'exhibitionPage']{
      _id,
      'secondaryRank': select(
        locations[0]->address.city == "New York" => select(
          locations[0]->address.addressLine match "West 19th Street" => select(
            locations[0]->address.addressLine match "519" => 1,
            locations[0]->address.addressLine match "525" => 2,
            locations[0]->address.addressLine match "533" => 3,
          ),
          locations[0]->address.addressLine match "West 20th" => 4,
          locations[0]->address.addressLine match "East 69th" => 5,
          6,
        ),
        locations[0]->address.city == "Los Angeles" => 20,
        locations[0]->address.city == "London" => 30,
        locations[0]->address.city == "Paris" => 40,
        locations[0]->address.city == "Hong Kong" => 50,
      ),
      _type,
      title,
      slug,
      subtitle,
      description,
      summary,
      startDate,
      endDate,
      locations[]->,

      photos[],
      "artists": artists[]->,
      "artworks": artworks[]->,
      "collections": collections[]->,
      heroMedia {
        ${mediaBuilder}
      }
    } | order(startDate asc, secondaryRank asc)
  }
`
