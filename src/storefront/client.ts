import {createStorefrontClient} from '@shopify/hydrogen-react'

import {env} from '@/env.mjs'
const config: any = {
  storeDomain: env.NEXT_PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
  storefrontApiVersion: env.NEXT_PUBLIC_STOREFRONT_API_VERSION,
}

if (typeof window === 'undefined')
  config.privateStorefrontToken = env.NEXT_PRIVATE_STOREFRONT_API_TOKEN

const client = createStorefrontClient(config)

export const {getStorefrontApiUrl, getPrivateTokenHeaders, getPublicTokenHeaders} = client
