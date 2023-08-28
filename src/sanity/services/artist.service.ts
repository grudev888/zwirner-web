import {z} from 'zod'

import {client} from '@/sanity/client'
import {artistArtworkBySlug, artistById} from '@/sanity/queries/artist.queries'
import {
  artistPageBySlug,
  artistPageSlugs,
  getAllArtistsPages,
} from '@/sanity/queries/artistPage.queries'

const CurrencySchema = z.enum(['EUR', 'USD', 'GBP', 'HKD'])
const FramedSchema = z.enum(['Framed', 'Unframed', 'NotApplicable'])
const ArtworkTypeSchema = z.enum([
  'drawing',
  'mixedMedia',
  'painting',
  'photography',
  'print',
  'sculpture',
  'other',
])

const ArtistArtworkBySlugPropsSchema = z.object({
  slug: z.string(),
})

// TODO: Describe properly z.any() types
// TODO: move zod validation with service itself to separate file
const ArtistArtworkBySlugSchema = z.object({
  additionalCaption: z.any(),
  artists: z.any(),
  artworkCTA: z.any(),
  artworkType: ArtworkTypeSchema,
  copyrightInformation: z.any(),
  currency: CurrencySchema.nullish(),
  dateSelection: z.object({
    year: z.string(),
    _type: z.literal('dateSelectionYear'),
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

export type ArtistArtworkBySlugType = z.infer<typeof ArtistArtworkBySlugSchema>

export async function getArtistById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistById, id)) || []
  }
  return []
}

export async function getAllArtistPageSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPageSlugs)) || []
  }
  return []
}

export async function getArtistPageData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(getAllArtistsPages)) || []
  }
  return []
}

export async function getArtistPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistPageBySlug, params)) || []
  }
  return []
}

// TODO: add validation error handling
export async function getArtistArtworkBySlug(
  params: z.infer<typeof ArtistArtworkBySlugPropsSchema>
) {
  const validatedParams = ArtistArtworkBySlugPropsSchema.parse(params)
  const data = await client.fetch(artistArtworkBySlug, validatedParams)
  const validatedData = ArtistArtworkBySlugSchema.parse(data)
  return validatedData
}
