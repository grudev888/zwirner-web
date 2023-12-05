// This config sets up some shared constants and Playwright config to share in your Browser checks.
/*
Notice we use two sets of URLs:

1. One for running scripts in local development.
2. Two URLs for Preview and Production monitoring and test,
  where the ENVIRONMENT_URL is automatically replaced
  with the Preview URL when a Vercel deploy happens.
*/

require('dotenv').config()
import axios from 'axios'
const LOCAL_DEV_URL = 'http://localhost:3000'
const PREVIEW_URL = process.env.ENVIRONMENT_URL
const PROD_URL = 'https://prod-www.zwirner.tech'

export const defaults = {
  baseURL: process.env.NODE_ENV === 'development' ? LOCAL_DEV_URL : PREVIEW_URL || PROD_URL,
  playwright: {
    viewportSize: {
      width: 1280,
      height: 720,
    },
  },
  screenshotPath: 'test-results/screenshots',
}

export const sanityFetch = async (query: string, params: any = {}) => {
  const mapParams: any = {}
  for (const key in params) {
    mapParams[`$${key}`] = `"${params[key]}"`
  }
  const response = await axios.get(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      params: {
        query,
        ...mapParams,
      },
    }
  )
  return response.data.result
}

// TODO Copped this file from https://github.com/checkly/docs.checklyhq.com/blob/main/__checks__/defaults.ts
// export const alertChannelIds = {
//   slack: 155587,
//   opsGenieP3: 155589,
//   opsGenieP1: 155588
// }
