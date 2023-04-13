import {client} from '@/sanity/client'
import {artistById} from '@/sanity/queries/artist.queries'

export async function getArtistById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(artistById, id)) || []
  }
  return []
}
