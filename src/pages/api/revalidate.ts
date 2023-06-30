import {NextApiRequest, NextApiResponse} from 'next'

import camelToDash from '@/utils/string/camelToDash'
import TypesToPathsMap from '@/sanity/typesToPathsMap'

/**
 * ISR endpoint called by Sanity Webhook defined in Sanity Project -> API -> Webhooks
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.ISR_TOKEN) {
    return res.status(401).json({message: 'Invalid token'})
  }
  const slug = req.body?.slug?.current
  const type = req.body?._type
  let basePath

  // externalNews is content hosted on an external site so we cannot update it
  if (req.body?.type === 'externalNews') {
    return res.json({revalidated: false})
  }
  // TODO Enable ISR for these when https://zwirner.atlassian.net/browse/NWEB-553 is fixed
  if (['exhibitionPage', 'article'].includes(type)) {
    return res.json({revalidated: false})
  }

  // Reconstruct the NextJS page route to revalidate based on the respective Sanity schema
  // e.g. /artists/tomma-abts, /utopia-editions
  if (type === 'home') {
    basePath = '/'
  } else if (slug) {
    basePath = TypesToPathsMap[type] ? `/${TypesToPathsMap[type]}` : undefined
  } else {
    basePath = `/${camelToDash(type)}`
  }

  if (!type || !basePath) {
    return res.json({revalidated: false})
  }
  try {
    await res.revalidate(slug ? `xxxxxx-${basePath}${slug}` : basePath)
    return res.json({revalidated: true})
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error('[revalidate]', message);
    //return res.status(message.includes('Invalid response 404') ? 404 : 400)
    return res.json({revalidated: false})
  }
}
