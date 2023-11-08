import {groq} from 'next-sanity'

export const getPreviewBySlug = groq`
*[defined(slug.current) && slug.current == $slug][0]{"slug": slug.current}`
