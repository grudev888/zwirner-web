import {client} from '@/sanity/client'
import {storiesData} from '@/sanity/queries/stories.queries'

export async function getStoriesData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(storiesData)) || []
  }
  return []
}
