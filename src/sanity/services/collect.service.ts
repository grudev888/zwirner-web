import {client} from '@/sanity/client'
import {collectPageData} from '@/sanity/queries/collect.queries'

export async function getCollectData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(collectPageData)) || []
  }
  return []
}
