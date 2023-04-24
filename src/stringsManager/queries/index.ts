import {groq} from 'next-sanity'

export const newsletterErrors = groq`
*[_type == "strings" && name == "Errors"][0] {
    _id,
    name,
    content
}
`
