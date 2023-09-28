import {groq} from 'next-sanity'
import {z} from 'zod'

import {ArtworkContentSchema} from '@/sanity/queries/components/content/artworkContent'
import {pageSEOFields} from '@/sanity/queries/components/seo/pageSEOFields'

import {mediaBuilder} from '../components/builders/mediaBuilder'

export const artworkData = groq`
*[_type == "artwork" && defined(slug.current) && slug.current == $slug][0]{
  additionalCaption,
  artists[]-> {fullName, artistPage->{slug}},
  artworkCTA,
  artworkType,
  copyrightInformation,
  currency,
  dateSelection,
  description,
  dimensions,
  displayDate,
  displayCustomTitle,
  displayTitle,
  editionInformation,
  framed,
  framedDimensions,
  medium,
  photos[]{
    ...,
    ${mediaBuilder}
  },
  price,
  productInformation,
  salesInformation,
  seo {
    ${pageSEOFields}
  },
  title,
}`

export const ArtworkDataPropsSchema = z.object({
  slug: z.string(),
})

export type ArtworkDataPropsType = z.infer<typeof ArtworkDataPropsSchema>

export const ArtworkDataSchema = z.object({
  additionalCaption: ArtworkContentSchema.shape.additionalCaption,
  artists: z.nullable(z.array(z.any())),
  artworkCTA: ArtworkContentSchema.shape.artworkCTA,
  artworkType: ArtworkContentSchema.shape.artworkType,
  copyrightInformation: ArtworkContentSchema.shape.copyrightInformation,
  currency: ArtworkContentSchema.shape.currency,
  dateSelection: ArtworkContentSchema.shape.dateSelection,
  description: ArtworkContentSchema.shape.description,
  dimensions: ArtworkContentSchema.shape.dimensions,
  displayCustomTitle: ArtworkContentSchema.shape.displayCustomTitle,
  displayDate: ArtworkContentSchema.shape.displayDate,
  displayTitle: ArtworkContentSchema.shape.displayTitle,
  editionInformation: ArtworkContentSchema.shape.editionInformation,
  framed: ArtworkContentSchema.shape.framed,
  framedDimensions: ArtworkContentSchema.shape.framedDimensions,
  medium: ArtworkContentSchema.shape.medium,
  photos: ArtworkContentSchema.shape.photos,
  price: ArtworkContentSchema.shape.price,
  productInformation: ArtworkContentSchema.shape.productInformation,
  salesInformation: ArtworkContentSchema.shape.salesInformation,
  seo: ArtworkContentSchema.shape.seo,
  title: ArtworkContentSchema.shape.title,
})

export type ArtworkDataType = z.infer<typeof ArtworkDataSchema>
