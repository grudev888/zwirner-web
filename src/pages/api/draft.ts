import {validatePreviewUrl} from '@sanity/preview-url-secret'
import * as Sentry from '@sentry/nextjs'
import {NextApiRequest, NextApiResponse} from 'next'

import {client, readToken} from '../../sanity/client'

function redirectToPreview(res: NextApiResponse<string | void>, Location: string): void {
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({enable: true})
  // Redirect to a preview capable route
  res.writeHead(307, {Location})
  res.end()
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query) {
    return res.status(401).send('Invalid Request')
  }

  const reqPreviewURL = req.url as string
  if (!reqPreviewURL) {
    throw new Error('Draft mode requires a preview URL.')
  }

  const authenticatedClient = client.withConfig({token: readToken})
  const {isValid, redirectTo = '/'} = await validatePreviewUrl(authenticatedClient, reqPreviewURL)
  if (!isValid) {
    Sentry.captureException(`Invalid secret sent to draft mode API`, {
      level: 'error',
      extra: {url: reqPreviewURL},
    })
    return res.status(401).send('Invalid secret')
  }

  redirectToPreview(res, redirectTo)
}
