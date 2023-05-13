import {client} from '@/sanity/client'
import {homeData} from '@/sanity/queries/home.queries'

export async function getHomeData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(homeData)) || []
  }
  return []
}
