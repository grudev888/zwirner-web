import {groq} from 'next-sanity'
import {z} from 'zod'

import {ArtworkContentSchema} from '@/sanity/queries/components/content/artworkContent'
import {pageSEOFields} from '@/sanity/queries/components/seo/pageSEOFields'

import {mediaBuilder} from '../components/builders/mediaBuilder'

export const artworkData = groq`
*[_type == "artwork" && defined(slug.current) && slug.current == $slug][0]{
  _id,
  additionalCaption,
  artists[]-> {fullName, artistPage->{slug}},
  artworkCTA,
  artworkType,
  backgroundColor,
  copyrightInformation,
  currency,
  dateSelection,
  description,
  dimensions,
  inventoryId,
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
  _createdAt,
  salesInformation,
  "seo": {
    "title": artists[][0]->fullName + ": " + select(displayCustomTitle == true => pt::text(displayTitle), title) + ", " + select(defined(displayDate)==true=>displayDate, dateSelection.year),
    ...seo {
      ${pageSEOFields}
    }
  },
  title,
  "product": shopify->store{ id, variants[]->{ store { id, price, inventory { isAvailable } } } },
}`

export const ArtworkDataPropsSchema = z.object({
  slug: z.string(),
})

export type ArtworkDataPropsType = z.infer<typeof ArtworkDataPropsSchema>

export const ArtworkDataSchema = z.object({
  _id: ArtworkContentSchema.shape._id,
  additionalCaption: ArtworkContentSchema.shape.additionalCaption,
  artists: z.nullable(z.array(z.any())),
  artworkCTA: ArtworkContentSchema.shape.artworkCTA,
  artworkType: ArtworkContentSchema.shape.artworkType,
  backgroundColor: ArtworkContentSchema.shape.backgroundColor,
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
  _createdAt: ArtworkContentSchema.shape._createdAt,
  inventoryId: ArtworkContentSchema.shape.inventoryId,
  price: ArtworkContentSchema.shape.price,
  productInformation: ArtworkContentSchema.shape.productInformation,
  salesInformation: ArtworkContentSchema.shape.salesInformation,
  seo: ArtworkContentSchema.shape.seo,
  title: ArtworkContentSchema.shape.title,
  product: ArtworkContentSchema.shape.product,
})

export type ArtworkDataType = z.infer<typeof ArtworkDataSchema>
