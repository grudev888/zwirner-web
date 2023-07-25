import {groq} from 'next-sanity'

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

export const artworksData = groq`
*[_type == "artwork" && defined(slug) && slug.current == $slug]{
  ...,
  "slug": artists[0]->artistPage->slug.current,
  "artworkSlug": slug.current,
}
`

export const allArtworks = groq`
*[_type == "artwork" && defined(slug)].slug.current`
