import {groq} from 'next-sanity'

export const exhibitionSimpleFields = groq`
  _id,
  _type,
  title,
  slug,
  subtitle,
  description,
  summary,
  startDate,
  endDate,
`

const exhibitionDateFields = groq`
  _id,
  "date": endDate,
`

export const exhibitionComplexFields = groq`
  photos[],
  "artists": artists[]->,
  "artworks": artworks[]->,
  "collections": collections[]->,
  heroMedia
`

export const allExhibitions = groq`
*[_type == "exhibitionPage"] | order(date desc, _updatedAt desc) {
  ${exhibitionSimpleFields}
  ${exhibitionComplexFields}
}`

export const exhibitionsLandingData = groq`
  {
    'cities': array::unique(*[_type == "location"].address.city),
    'interstitial': *[_type == "exhibitionsLanding"][0] {
      ...interstitial {
        ...,
        image{asset->},
      }
    },
    'museumHighlights': *[_type == "exhibitionsLanding"][0] { museumHighlights[]-> }.museumHighlights,
    'upcomingExhibitionsComponent': *[_type == "exhibitionsLanding"][0] {upcomingExhibitionsComponent}.upcomingExhibitionsComponent,
    'exhibitions': *[_type == 'exhibitionPage']{
      _id,
      'secondaryRank': select(
        locations[0]->address.city == "New York" => select(
          locations[0]->address.addressLine match "West 19th Street" => select(
            locations[0]->address.addressLine match "519" => 1,
            locations[0]->address.addressLine match "525" => 2,
            locations[0]->address.addressLine match "533" => 3,
          ),
          locations[0]->address.addressLine match "West 20th" => 4,
          locations[0]->address.addressLine match "East 69th" => 5,
          6,
        ),
        locations[0]->address.city == "Los Angeles" => 20,
        locations[0]->address.city == "London" => 30,
        locations[0]->address.city == "Paris" => 40,
        locations[0]->address.city == "Hong Kong" => 50,
      ),
      _type,
      title,
      slug,
      subtitle,
      description,
      summary,
      startDate,
      endDate,
      locations[]->,

      photos[],
      "artists": artists[]->,
      "artworks": artworks[]->,
      "collections": collections[]->,
      heroMedia {
        type,
        image {
          ...,
          asset->
        }
      }
    } | order(startDate asc, secondaryRank asc)
  }
`

export const getExhibitionByDate = groq`
*[_type == "exhibitionPage"] {
  ${exhibitionDateFields}
}`

export const exhibitionById = groq`
*[_type == "exhibitionPage" && _id == $exhibitionId ] {
  ...
}`
