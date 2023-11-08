import {type SanityClient} from 'next-sanity'

import {homePage, HomePageSchema} from '@/sanity/queries/page/homePage'

// TODO: add validation error handling
export async function getHomePage(client: SanityClient) {
  const data = await client.fetch(homePage)
  const validatedData = HomePageSchema.parse(data)
  return validatedData
}
