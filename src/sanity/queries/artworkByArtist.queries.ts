import {groq} from 'next-sanity'

import {artworkFields} from '@/sanity/queries/artwork.queries'

// TODO actual query by artist id / slug / something
export const artworkByArtist = groq`
*[_type == "artwork"] | order(date desc, _updatedAt desc) {
  ${artworkFields}
}`

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && slug.current == $slug]{
  ...,
  surveySubpage {
    ...,
    items[]->{...}
  }
}`
