import {NextApiHandler} from 'next'

import {env} from '@/env.mjs'

import {client} from '../../../sanity/client'
import {previewSecretId} from '../../../sanity/constants'
import {getSecret} from '../../../sanity/secret'

const isString = (text: any) => {
  return typeof text === 'string' || text instanceof String
}

const handler: NextApiHandler = async function preview(req, res) {
  const previewData: {token?: string} = {}
  if (!env.SANITY_API_READ_TOKEN) {
    return res.status(404).end()
  }

  const {query} = req

  const secret = isString(query.secret) ? query.secret : undefined

  if (secret) {
    const authClient = client.withConfig({useCdn: false, token: env.SANITY_API_READ_TOKEN})

    // The secret can't be stored in an env variable with a NEXT_PUBLIC_ prefix, as it would make you
    // vulnerable to leaking the token to anyone. If you don't have an custom API with authentication
    // that can handle checking secrets, you may use https://github.com/sanity-io/sanity-studio-secrets
    // to store the secret in your dataset.
    const storedSecret = await getSecret({
      client: authClient,
      id: previewSecretId,
    })
    // This is the most common way to check for auth, but we encourage you to use your existing auth
    // infra to protect your token and securely transmit it to the client
    if (secret !== storedSecret) {
      return res.status(401).send('Invalid secret')
    }
    previewData.token = env.SANITY_API_READ_TOKEN
  }

  if (typeof query.path === 'string') {
    res.setPreviewData(previewData)
    res.writeHead(307, {Location: `/${query.path.replace(/,/g, '/')}`})
    res.end()
    return
  }

  res.status(404)
  res.end()
}

export default handler
