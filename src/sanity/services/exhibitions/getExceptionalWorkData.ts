import {SanityClient} from 'next-sanity'

import {
  exceptionalWorksData,
  ExceptionalWorksDataPropsSchema,
  ExceptionalWorksDataPropsType,
  ExceptionalWorksDataSchema,
} from '@/sanity/queries/exhibitions/exceptionalWorksData'

export async function getExceptionalWorkData(
  client: SanityClient,
  params: ExceptionalWorksDataPropsType
) {
  const validatedParams = ExceptionalWorksDataPropsSchema.parse(params)
  const data = await client.fetch(exceptionalWorksData, validatedParams)
  if (!data) return null
  const validatedData = ExceptionalWorksDataSchema.parse(data)
  return validatedData
}
