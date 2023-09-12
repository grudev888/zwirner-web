import {groq} from 'next-sanity'

export const artworkData = groq`
*[_type == "artwork" && defined(slug.current) && slug.current == $slug][0]{
  additionalCaption,
  artists[]-> {fullName, artistPage->{slug}},
  artworkCTA,
  artworkType,
  copyrightInformation,
  currency,
  dateSelection,
  description,
  dimensions,
  displayDate,
  displayCustomTitle,
  displayTitle,
  editionInformation,
  framed,
  framedDimensions,
  medium,
  photos,
  price,
  productInformation,
  salesInformation,
  seo,
  title,
}`
