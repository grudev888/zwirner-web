import {groq} from 'next-sanity'

export const allLocationCities = groq`
*[_type == "location"] {
  address {
    city
  }
}
`
