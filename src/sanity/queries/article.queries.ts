import {groq} from 'next-sanity'

import {articleContent} from '@/sanity/queries/components/content/articleContent'
import {artworkContent} from '@/sanity/queries/components/content/artworkContent'
import {dzInterstitialFields} from '@/sanity/queries/components/dzInterstitialProps'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'

export const articlesReferences = groq`
  articles[]-> {
    ...,
    ${articleContent}
    _type == "exhibitionPage"=> {
      ...,
      title,
      _type,
      "exhibition":  {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  }
`

export const pressBySlug = groq`
*[_type == "article" && type == "pressRelease" && slug.current == $slug][0]{
  ...,
  location-> {
    name
  },
  "artistPageData": *[_type == "artistPage" && references(^._id)][0]{
    title,
    'parentUrl': slug.current
  },
  ${articlesReferences}
}
`

export const articleBySlug = groq`
*[_type == "article" && slug.current == $slug][0]{
  ...,
  interstitial {
    ${dzInterstitialFields}
  },
  header[]{
    _type == 'headerImage' => media {
      "caption": ^.caption,
      ${mediaBuilder}
    },
    _type == 'artwork' => @-> {
      _id,
      ${artworkContent}
    },
  },
  image {
    image {
      ...
    }
  },
  location-> {
    name
  },
  ${articlesReferences},
  type == "pressRelease" => {
    'pdfURL': pdf.asset->url,
    location->
  }
}`
