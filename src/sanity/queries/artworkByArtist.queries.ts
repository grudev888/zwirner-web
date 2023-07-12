import {groq} from 'next-sanity'

export const artworksDataByArtistSlug = groq`
*[_type == "artistPage" && slug.current == $slug]{
  title,
  slug { current },
  surveySubpage {
    title,
    items[]->{...}
  }
}`
