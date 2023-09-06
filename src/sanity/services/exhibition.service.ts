import {client} from '@/sanity/client'
import {
  allExhibitions,
  exhibitionById,
  exhibitionsLandingData,
} from '@/sanity/queries/exhibition.queries'
import {
  checklistBySlug,
  exhibitionPageBySlug,
  exhibitionPageSlugs,
  installationViewsBySlug,
} from '@/sanity/queries/exhibitionPage.queries'

export async function getAllExhibitions(): Promise<any[]> {
  if (client) {
    return (await client.fetch(allExhibitions)) || []
  }
  return []
}

export async function getExhibitionsLandingPageData(): Promise<any> {
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

export async function getAllExhibitionPagesSlugs(): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionPageSlugs)) || []
  }
  return []
}

export async function getExhibitionPageBySlug(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(exhibitionPageBySlug, params)) || []
  }
  return []
}

export async function getExhibitionInstallationViews(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(installationViewsBySlug, params)) || []
  }
  return []
}

export async function getExhibitionChecklist(params: any): Promise<any[]> {
  if (client) {
    return (await client.fetch(checklistBySlug, params)) || []
  }
  return []
}
