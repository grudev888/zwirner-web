import {groq} from 'next-sanity'

import {mediaBuilder} from '@/sanity/queries/object.queries'

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
  photos[]{
    ${mediaBuilder}
  },
  price,
  productInformation,
  salesInformation,
  seo,
  title,
}`
