import {z} from 'zod'

import {client} from '@/sanity/client'
import {artworkData} from '@/sanity/queries/artworks/artworkData'

import {ArtworkTypeSchema, CurrencySchema, FramedSchema} from './validationPrimitives'

const ArtworkDataPropsSchema = z.object({
  slug: z.string(),
})

// TODO: Describe properly z.any() types
const ArtworkDataSchema = z.object({
  additionalCaption: z.any(),
  artists: z.any(),
  artworkCTA: z.any(),
  artworkType: ArtworkTypeSchema,
  copyrightInformation: z.any(),
  currency: CurrencySchema.nullish(),
  dateSelection: z.object({
    year: z.string(),
  }),
  description: z.any(),
  dimensions: z.any(),
  displayCustomTitle: z.nullable(z.boolean()),
  displayDate: z.nullable(z.string()),
  displayTitle: z.nullable(z.any()),
  editionInformation: z.any(),
  framed: FramedSchema,
  framedDimensions: z.any(),
  medium: z.nullable(z.string()),
  photos: z.any(),
  price: z.nullable(z.number()),
  productInformation: z.any(),
  salesInformation: z.any(),
  seo: z.any(),
  title: z.string(),
})

export type ArtworkDataType = z.infer<typeof ArtworkDataSchema>

// TODO: add validation error handling
export async function getArtworkData(params: z.infer<typeof ArtworkDataPropsSchema>) {
  const validatedParams = ArtworkDataPropsSchema.parse(params)
  const data = await client.fetch(artworkData, validatedParams)
  if (!data) return null
  const validatedData = ArtworkDataSchema.parse(data)
  return validatedData
}
