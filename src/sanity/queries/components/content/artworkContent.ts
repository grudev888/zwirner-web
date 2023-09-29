import {groq} from 'next-sanity'
import {z} from 'zod'

import {pageSEOFields, PageSEOFieldsSchema} from '@/sanity/queries/components/seo/pageSEOFields'

import {mediaBuilder} from '../builders/mediaBuilder'
import {SanitySlugSchema} from '../validationPrimitives'
export const artworkContent = groq`
  _type == 'artwork' => {
    seo {
      ${pageSEOFields}
    },
    title,
    displayCustomTitle,
    displayTitle,
    slug,
    displayDate,
    dateSelection,
    photos[]{
      ...,
      ${mediaBuilder}
    },
    artworkType,
    medium,
    inventoryId,
    dimensions,
    framedDimensions,
    framed,
    availability,
    artworkCTA,
    price,
    currency,
    additionalCaption,
    editionInformation,
    copyrightInformation,
    salesInformation,
    productInformation,
    description,
    "product": shopify->store{ id, variants[]->{ store { id, price, inventory { isAvailable } } } },
    "artists": artists[]->
  },
`

export const ArtworkTypeSchema = z.enum([
  'drawing',
  'mixedMedia',
  'painting',
  'photography',
  'print',
  'sculpture',
  'other',
])
export const ArtworkCurrencySchema = z.enum(['EUR', 'USD', 'GBP', 'HKD'])
export const ArtworkAvailabilitySchema = z.enum(['available', 'unavailable'])
export const ArtworkFramedSchema = z.enum(['Framed', 'Unframed', 'NotApplicable'])

// TODO: Describe properly z.any() types
export const ArtworkContentSchema = z.object({
  seo: z.nullable(PageSEOFieldsSchema),
  title: z.string(),
  inventoryId: z.nullable(z.string()),
  displayCustomTitle: z.nullable(z.boolean()),
  displayTitle: z.nullable(z.array(z.any())),
  slug: SanitySlugSchema,
  artists: z.nullable(z.array(z.any())),
  displayDate: z.string().nullish(),
  dateSelection: z.object({
    year: z.string(),
  }),
  photos: z.nullable(z.array(z.any())),
  artworkType: ArtworkTypeSchema,
  medium: z.nullable(z.string()),
  dimensions: z.nullable(z.array(z.any())),
  framedDimensions: z.array(z.any()).nullish(),
  framed: ArtworkFramedSchema,
  availability: z.nullable(ArtworkAvailabilitySchema),
  artworkCTA: z.nullable(z.any()),
  price: z.number().nullish(),
  currency: ArtworkCurrencySchema.nullish(),
  additionalCaption: z.array(z.any()).nullish(),
  editionInformation: z.nullable(z.array(z.any())),
  copyrightInformation: z.array(z.any()).nullish(),
  salesInformation: z.array(z.any()).nullish(),
  productInformation: z.array(z.any()).nullish(),
  description: z.array(z.any()).nullish(),
  product: z.nullable(z.any()),
})
