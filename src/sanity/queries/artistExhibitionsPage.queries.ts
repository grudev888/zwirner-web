import {groq} from 'next-sanity'

export const artistExhibitionsPageData = groq`
*[_type == "artistPage" && slug.current == $slug]{
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
