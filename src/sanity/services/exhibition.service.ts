import {client} from '@/sanity/client'
import {allExhibitions, exhibitionById} from '@/sanity/queries/exhibition.queries'

export async function getAllExhibitions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allExhibitions)) || []
  }
  return []
}

export async function getExhibitionById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionById, id)) || []
  }
  return []
}
