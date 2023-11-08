import {SanityClient} from 'next-sanity'

import {client} from '@/sanity/client'
import {allExhibitions, exhibitionById} from '@/sanity/queries/exhibition.queries'
import {exhibitionsLandingData} from '@/sanity/queries/exhibitionPage.queries'
import {checklistBySlug} from '@/sanity/queries/exhibitionPage.queries'

export async function getAllExhibitions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allExhibitions)) || []
  }
  return []
}

export async function getExhibitionsLandingPageData(client: SanityClient): Promise<any> {
  if (client) {
    return (await client.fetch(exhibitionsLandingData)) || {}
  }
  return {}
}

export async function getExhibitionById(id: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionById, id)) || []
  }
  return []
}

export async function getExhibitionChecklist(client: SanityClient, params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(checklistBySlug, params)) || []
  }
  return []
}
