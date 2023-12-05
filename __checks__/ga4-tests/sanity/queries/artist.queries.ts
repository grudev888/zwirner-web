import {artworkFields} from './artwork.queries'

export const artistArtworks = /* groq */ `
*[_type == "artistPage"][0] {
  "pageTitle": coalesce(seo.pageTitle, title),
  _rev,
  slug,
  survey {
    dzCarousel[0...3]{
      content[]-> {
        ${artworkFields}
      },
    }
  },
}
`

export const artistArtworksOnlyHaveInquireCTA = /* groq */ `
*[_type == "artistPage" && (survey.dzCarousel[0].content[0]->.artworkCTA.CTA == "inquire" || survey.dzCarousel[0].content[0]->.artworkCTA.secondaryCTA == "inquire" )][0] {
  slug,
  survey {
    dzCarousel[content[0]->.artworkCTA.CTA == "inquire" || content[0]->.artworkCTA.secondaryCTA == "inquire"][0]{
      content[0]-> {
        ${artworkFields}
      },
    }
  },
}
`

export const artworkHavingInquireCTAInArtistPageQuery: string = /* groq */ `
*[_type=='artwork' && artworkCTA.CTA == 'inquire'] {
  ${artworkFields}
  'artistPages':*[_type == "artistPage" && defined(survey) && ^._id in survey.dzCarousel[].content[]._ref] {
    _id,
    slug,
  }
}
`
