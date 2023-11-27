import {groq} from 'next-sanity'

import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from '@/sanity/queries/components/content/exhibitionPageContent'

import {dzInterstitialFields} from './components/dzInterstitialProps'
import {dzGridFields} from './components/gridMoleculeProps'
import {pageSEOFields} from './components/seo/pageSEOFields'
import {pageBuilderComponentsData} from './page/pageCommonQueries/pageBuilderComponentsData'

export const checklistBySlug = groq`
*[_type == "exhibitionPage" && slug.current == $slug][0] {
  title,
  subtitle,
  startDate,
  endDate,
  locations[]->,
  'showChecklist': count(checklist.grid) > 0,
  'showInstallationViews': count(installationViews.grid) > 0,
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

export const exhibitionsLandingData = groq`
  {
    "seo": *[_type == "exhibitionsLanding"][0] {
      title,
      ...seo {
        ${pageSEOFields}
      }
    },
    'cities': array::unique(*[_type == "location"].address.city),
    'pageBuilder': *[_type == "exhibitionsLanding"][0] {
      introContent[]{
        ${pageBuilderComponentsData}
      },
    },
    'upcomingComponent': *[_type == "exhibitionsLanding"][0] {
      upcomingComponent
    }.upcomingComponent,
    'pastExhibitionsInterstitial': *[_type == "exhibitionsLanding"][0] {
      ...pastExhibitionsInterstitial {
        ${dzInterstitialFields}
      }
    },
    'subscribeInterstitial': *[_type == "exhibitionsLanding"][0] {
      ...subscribeInterstitial {
        ${dzInterstitialFields}
      }
    },
    'interstitial': *[_type == "exhibitionsLanding"][0] {
      ...interstitial {
        ${dzInterstitialFields}
      }
    },
    'museumHighlights': *[_type == "exhibitionsLanding"][0] {
      ...museumHighlights {
        ${dzGridFields}
      }
    },
    'exhibitions': *[_type == 'exhibitionPage']{
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
      ${exhibitionSimpleFields}
      ${exhibitionComplexFields}
    } | order(startDate asc, secondaryRank asc)
  }
`
