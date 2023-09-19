import {groq} from 'next-sanity'

export const artworkFields = groq`
  ...,
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
  artist->{fullName},
  surveySubpage {
    itemsPerRow,
    displayNumberOfResults,
    title,
    items[]->{
      ...,
      artists[]->{fullName}
    }
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
