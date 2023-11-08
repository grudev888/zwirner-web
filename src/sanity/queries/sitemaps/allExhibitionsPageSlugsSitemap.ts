import {groq} from 'next-sanity'

export const allExhibitionsPageSlugsSitemap = groq`
*[_type == "artistPage" && defined(slug.current) && defined(exhibitionsInterstitialSeo) && exhibitionsInterstitialSeo.robotsNoIndex == false]{
  "params": {
    artist-> {
    _id,
    "refs": count(*[_type == "exhibitionPage" && references(^._id)]),
    },
    "slug": slug.current,
    "lastmod": _updatedAt
  }
}
[params.artist.refs > 0]
`
