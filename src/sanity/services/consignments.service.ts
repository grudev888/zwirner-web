import {client} from '@/sanity/client'
import {consignmentsData} from '@/sanity/queries/consignments.queries'

export async function getConsignmentsData(): Promise<any[]> {
  if (client) {
    return (await client.fetch(consignmentsData)) || []
  }
  return []
}
