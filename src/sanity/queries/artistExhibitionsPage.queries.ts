import {groq} from 'next-sanity'

export const artistExhibitionsPageData = groq`
*[_type == "artistPage" && slug.current == $slug][0] {
  slug,
  artist-> {
    'exhibitions': *[_type == "exhibitionPage" && references(^._id)] {
      ...,
      locations[]->{name}
    },
    _id,
    fullName,
  },
  exhibitionsInterstitialSubpage
}`
