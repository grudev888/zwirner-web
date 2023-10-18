import {groq} from 'next-sanity'

import {articleContent} from '@/sanity/queries/components/content/articleContent'

import {artworkFields} from './artwork.queries'
import {mediaBuilder} from './components/builders/mediaBuilder'
import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const artistPageSlugs = groq`
*[_type == "artistPage" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`

export const getAllArtistsPages = groq`{
  "pageInfo": *[_type == "artistListing"] {
    ...
  },
  "artistPages":*[_type == "artistPage" && defined(slug.current) && artist->.affiliation == true] {
    ...,
    artist->
  }
}`

export const artistPageBySlug = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  ...,
  _id,
  title,
  availableWorksInterstitial,
  exhibitionsInterstitial,
  "artist": artist-> { ..., "cvUrl": cv.asset->url },
  survey {
  ...,
  displayTitle,
  displayCustomTitle,
  items[]-> {
    ...,
    photos[]{
      ...,
      ${mediaBuilder}
    },
    "artists": artists[]->
    }
  },
  latestExhibitions { ..., items[]-> { ..., location->{ _id, name, timezone }, } },
  guide {
    ...,
    items[]->{
      ...,
      header {
        ${mediaBuilder}
      }
    }
  },
  photos[]{
    ${mediaBuilder}
  },
  selectedPress { ..., items[]->, },
  books { ..., items[]->, },
  featured->{
    ${articleContent}
    _type == "artwork"=>{
      ${artworkFields}
    },
    _type == "exhibitionPage"=> {
      ${exhibitionSimpleFields}
      ${exhibitionComplexFields}
    },
  },
  seo {
    ${pageSEOFields}
  },
  slug,
}
`
