import {groq} from 'next-sanity'

import {dzCarouselFields} from '@/sanity/queries/components/dzCarouselProps'
import {dzInterstitialFields} from '@/sanity/queries/components/dzInterstitialProps'
import {dzSplitFields} from '@/sanity/queries/components/dzSplitProps'
import {dzGridFields} from '@/sanity/queries/components/gridMoleculeProps'
import {pageBuilderComponentsData} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {componentTypesData} from './components/componentTypesData'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const getAllArtistsPages = groq`{
  "pageInfo": *[_type == "artistListing"] {
    title,
    interstitial {
      ${dzInterstitialFields}
    },
    seo {
      ${pageSEOFields}
    },
  },
  "artistPages":*[_type == "artistPage" && defined(slug.current) && artist->.affiliation == true] {
    slug,
    artist-> {
      fullName,
      lastName,
      firstName
    }
  }
}`

export const artistPageBySlug = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  ...,

  featured {
    ${dzSplitFields},
    ${componentTypesData}
  },

  survey {
    ${dzCarouselFields}
  },

  // Remove this special case of Thomas Ruff on series unification
  surveyThomas {
    ${dzCarouselFields}
  },

  guide {
    ${dzCarouselFields}
  },

  availableWorks[]{
    ${pageBuilderComponentsData}
  },

  latestExhibitions []{
    ${pageBuilderComponentsData}
  },

  selectedPress {
    ${dzGridFields}
  },

  interstitial {
    ${dzInterstitialFields}
  },

  books {
    ${dzCarouselFields}
  },

  _id,
  title,
  "artist": artist-> { ..., "cvUrl": cv.asset->url },
  photos[]{
    ${mediaBuilder}
  },
  seo {
    ${pageSEOFields}
  },
  slug,
}
`
