import {client} from '@/sanity/client'
import {homePage, HomePageSchema} from '@/sanity/queries/page/homePage'

// TODO: add validation error handling
export async function getHomePage() {
  const data = await client.fetch(homePage)
  const validatedData = HomePageSchema.parse(data)
  return validatedData
}
