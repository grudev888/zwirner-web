import {NextApiRequest, NextApiResponse} from 'next'
import {isValidSecret} from 'sanity-plugin-iframe-pane/is-valid-secret'

import {client, readToken} from '../../sanity/client'
import {previewSecretId} from '../../sanity/constants'
import {resolveHref} from '../../sanity/links'

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

  const secret = req.query.secret as string
  const slug = req.query.slug as string
  const documentType = req.query.type as string

  if (!readToken) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.')
  }
  if (!secret) {
    return res.status(401).send('Invalid secret')
  }

  const authenticatedClient = client.withConfig({token: readToken})
  const validSecret = await isValidSecret(authenticatedClient, previewSecretId, secret)
  if (!validSecret) {
    return res.status(401).send('Invalid secret')
  }

  const href = resolveHref(documentType!, slug!)
  if (!href) {
    return res.status(400).send('Unable to resolve preview URL. Please add a slug')
  }

  // Redirect to the path from the fetched doc
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirectToPreview(res, href)
}
