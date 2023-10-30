import {groq} from 'next-sanity'

import {mediaBuilder} from './components/builders/mediaBuilder'

export const artworkFields = groq`
  ...,
  _id,
  _type,
  price,
  displayCustomTitle,
  displayTitle,
  title,
  medium,
  photos[]{${mediaBuilder}},
  edition,
  dimensions,
  framed,
  artists[]->,
  availability,
  dateSelection,
  artworkTypeToFill,
  inventoryId,
  artworksEdition[]->
`

export const allArtworks = groq`
*[_type == "artwork"] | order(date desc, _updatedAt desc) {
  ${artworkFields}
}`

export const artworkById = groq`
*[_type == "artwork" && _id == $artworkId ] {
  ${artworkFields}
}`
