import {type SanityClient} from 'next-sanity'

import {
  type ArtworkDataPropsType,
  artworkData,
  ArtworkDataPropsSchema,
  ArtworkDataSchema,
} from '@/sanity/queries/artworks/artworkData'

// TODO: add validation error handling
export async function getArtworkData(client: SanityClient, params: ArtworkDataPropsType) {
  const validatedParams = ArtworkDataPropsSchema.parse(params)
  const data = await client.fetch(artworkData, validatedParams)
  if (!data) return null
  const validatedData = ArtworkDataSchema.parse(data)
  return validatedData
}
