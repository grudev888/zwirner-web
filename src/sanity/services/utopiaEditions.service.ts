import {client} from '@/sanity/client'
import {utopiaEditionsData} from '@/sanity/queries/utopiaEditions.queries'

export async function getUtopiaEditions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(utopiaEditionsData)) || []
  }
  return []
}
