import {SanityClient} from 'next-sanity'

import {articleBySlug} from '@/sanity/queries/article.queries'

export async function getArticlePageBySlug(client: SanityClient, params: any): Promise<any[]> {
  if (client) {
    return await client.fetch(articleBySlug, params)
  }

  return []
}
