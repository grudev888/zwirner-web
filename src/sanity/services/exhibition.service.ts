import {client} from '@/sanity/client'
import {allExhibitions} from '@/sanity/queries/exhibition.queries'

export async function getAllExhibitions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allExhibitions)) || []
  }
  return []
}
