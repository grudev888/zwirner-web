import {NextApiHandler} from 'next'

import {client} from '../../../sanity/client'
import {previewSecretId} from '../../../sanity/constants'
import {readToken} from '../../../sanity/env'
import {getSecret} from '../../../sanity/secret'

const isString = (text: any) => {
  return typeof text === 'string' || text instanceof String
}

const handler: NextApiHandler = async function preview(req, res) {
  const previewData: {token?: string} = {}
  if (!readToken) {
    return res.status(404).end()
  }

  const {query} = req

  const secret = isString(query.secret) ? query.secret : undefined
  const slug = isString(query.slug) ? query.slug : undefined
  const section = isString(query.section) ? query.section : undefined

  // if (!secret) {
  //   return res.status(401).send('Invalid secret')
  // }

  if (secret) {
    const authClient = client.withConfig({useCdn: false, token: readToken})

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
    previewData.token = readToken
  }

  if (!slug) {
    res.setPreviewData(previewData)
    res.writeHead(307, {Location: '/'})
    res.end()
  }

  if (slug) {
    res.setPreviewData(previewData)
    res.writeHead(307, {Location: `/${section}/${slug}`})
    res.end()
    return
  }

  res.status(404)
  res.end()
}

export default handler
