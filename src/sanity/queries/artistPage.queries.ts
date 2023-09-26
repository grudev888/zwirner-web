import {groq} from 'next-sanity'

import {mediaBuilder} from '@/sanity/queries/object.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {artworkFields} from '@/sanity/queries/artwork.queries'

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
  "artist": artist-> { ..., "cvUrl": cv.asset->url },
  survey {
  ..., 
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
    _type == "article"=>{...},
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
