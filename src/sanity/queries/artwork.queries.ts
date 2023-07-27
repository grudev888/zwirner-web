import {groq} from 'next-sanity'

export const artworkFields = groq`
  _id,
  _type,
  price,
  title,
  medium,
  photos,
  edition,
  dimensions,
  framed,
  artists[]->,
  availability,
  dateSelection,
  artworkTypeToFill,
  artworksEdition[]->
`
export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && defined(slug) && slug.current == $slug]{
  title,
  slug { current },
  surveySubpage {
    itemsPerRow,
    displayNumberOfResults,
    title,
    items[]->{...}
  }
}`

export const allArtworks = groq`
*[_type == "artwork"] | order(date desc, _updatedAt desc) {
  ${artworkFields}
}`

export const artworkById = groq`
*[_type == "artwork" && _id == $artworkId ] {
  ${artworkFields}
}`

export const artworksData = groq`
*[_type == "artwork" && defined(slug) && slug.current == $slug][0]{
  ...,
  "slug": slug.current
}
`

export const allArtworkSlugs = groq`
*[_type == "artwork" && defined(slug)].slug.current`
