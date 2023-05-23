import {client} from '@/sanity/client'
import {footerData, headerData} from '@/sanity/queries/layout.queries'

export async function getHeaderData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(headerData)) || []
  }
  return []
}

export async function getFooterData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(footerData)) || []
  }
  return []
}
