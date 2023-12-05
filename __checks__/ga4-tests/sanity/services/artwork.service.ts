import {sanityFetch} from '../../../defaults'
import {artworkHavingInquireCTAQuery} from '../queries/artwork.queries'

export const artworkHavingInquireCTA = () => sanityFetch(artworkHavingInquireCTAQuery)
