import {groq} from 'next-sanity'

export const allArtworkSlugsSitemap = groq`
*[_type =='artwork' && defined(slug) && defined(seo)] {
  "params": {
    _id,
    "refs": count(*[references(^._id)]),
    "slug": slug.current,
    "showInSitemap": !seo.robotsNoIndex,
    "lastmod": _updatedAt
  }
}
[params.refs > 0]
`
