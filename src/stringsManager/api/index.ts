import {client} from '@/sanity/client'

import {newsletterErrors} from '../queries'

export async function getErrors(): Promise<any> {
  if (!client) return {}

  const errors = await client.fetch(newsletterErrors)

  return (
    errors?.content?.reduce(
      (prev: any, curr: any) => ({
        ...prev,
        [curr.identifier.current]: curr.content,
      }),
      {}
    ) || {}
  )
}
