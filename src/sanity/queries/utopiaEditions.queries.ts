import {groq} from 'next-sanity'

import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const utopiaEditionsData = groq`
*[_type == "utopiaEditions" ] {
  ...,
  media {
    type == "video" => {
      "url":video.asset->url
    },
    ...
  },
  seo {
    ${pageSEOFields}
  },
}`
