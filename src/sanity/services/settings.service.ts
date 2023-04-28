import {client} from '@/sanity/client'
import {generalSettings} from '@/sanity/queries/settings.queries'

export async function getGeneralSettings(): Promise<any> {
  if (client) {
    return (await client.fetch(generalSettings)) || []
  }
  return []
}
