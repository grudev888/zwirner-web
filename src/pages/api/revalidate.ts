import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import * as Sentry from '@sentry/nextjs'
import {NextApiRequest, NextApiResponse} from 'next'

import {ARTISTPAGE_TYPE, EXHIBITIONPAGE_TYPE, HOMEPAGE_TYPE} from '@/common/constants/pageTypes'
import {ARTIST_SUBPAGES, EXHIBITION_SUBPAGES} from '@/common/constants/subPages'
import {env} from '@/env.mjs'
import {getReferencedSlugs} from '@/sanity/services/revalidate/getReferencedSlugs'

const secret = env.ISR_TOKEN as string

type responseType = {
  success?: boolean
  revalidated?: boolean
  message?: string
  slug?: string
}[]

type reqBody = {
  slug: string | null | undefined
  type: string
}

type revalPaths = string[]

/**
 * ISR endpoint called by Sanity Webhook defined in Sanity Project -> API -> Webhooks
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const signature = req.headers[SIGNATURE_HEADER_NAME]?.toString() as string
  const id = req.headers['sanity-document-id']?.toString()
  const body = await readBody(req)
  const jsonBody = JSON.parse(body)
  const {slug, type}: reqBody = jsonBody

  // get all document types and slugs that reference the source document
  const refDocs = id ? await getReferencedSlugs(id) : []

  // create array of source doc and all referenced docs to revalidate
  const docsArray = slug ? [{slug: slug, type: type}, ...refDocs] : [...refDocs]

  // create final array of slugs based on docs, subpages, and referral docs
  const finalPaths: revalPaths = []
  docsArray.map((doc) => {
    const {slug, type} = doc
    // set path to '/' if this is the homepage
    const docPath = type === HOMEPAGE_TYPE ? '/' : slug
    if (docPath) {
      finalPaths.push(docPath)
      // get slugs for any subpages of the doc
      const subPages = defineSubPages(type)
      subPages.map((subPage) => {
        const path = `${slug}/${subPage}`
        finalPaths.push(path)
      })
    }
    // TODO add slugs for pages and year filters if exhibitions
  })

  //error handling
  const errorDetails = `| Slug: ${slug} Type: ${type}`

  if (req.method !== 'POST') {
    Sentry.captureException(`non POST request sent to revalidate API ${errorDetails}`)
    return res.status(405).json({message: 'Must be a POST request'})
  }

  if (!id) {
    Sentry.captureException(`No document id sent from Sanity webhook ${errorDetails}`)
    return res.status(401).json({success: false, message: 'No document id'})
  }

  if (!isValidSignature(body, signature, secret)) {
    Sentry.captureException(`Invalid signature sent to revalidate API ${errorDetails}`)
    res.status(401).json({success: false, message: 'Invalid signature'})
    return
  }

  if (!finalPaths.length) {
    Sentry.captureMessage(
      `Final revalidation request contained no slugs in revalidate API ${errorDetails}`
    )
    return res.json({revalidated: false})
  }

  //revalidate array of slugs
  let response: responseType = []
  await Promise.all(
    finalPaths.map(async (page) => {
      try {
        await res.revalidate(page)
        response.push({revalidated: true, slug: page})
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e)
        Sentry.captureException(message)
        return res.status(500).send(message)
      }
    })
  )
  return res.json(response)
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

async function readBody(readable: NextApiRequest) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function defineSubPages(type: string): string[] {
  let subPages: string[] = []
  switch (type) {
    case ARTISTPAGE_TYPE:
      subPages = ARTIST_SUBPAGES
      break
    case EXHIBITIONPAGE_TYPE:
      subPages = EXHIBITION_SUBPAGES
      break
    default:
      break
  }

  return subPages
}
