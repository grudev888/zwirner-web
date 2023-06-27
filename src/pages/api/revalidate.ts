import {NextApiRequest, NextApiResponse} from 'next'

import camelToDash from '@/utils/string/camelToDash'
import TypesToPathsMap from '@/sanity/typesToPathsMap'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.ISR_TOKEN) {
    return res.status(401).json({message: 'Invalid token'})
  }

  try {
    const slug = req.body?.slug?.current
    const type = req.body?._type
    let basePath

    if (req.body?.type === 'externalNews') {
      return res.json({revalidated: false})
    }
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
    await res.revalidate(slug ? `${basePath}${slug}` : basePath)
    return res.json({revalidated: true})
  } catch (err) {
    // TODO report an error to surface internally to notify us the revalidation failed
    // We cannot return a res.status(500) because it will cause Sanity to retry the request
    // for 30 minutes and will not allow other requests to complete until the failing request
    // is either resolved or times out https://www.sanity.io/docs/webhooks#33326b412b2d
    return res.json({revalidated: false})
  }
}
