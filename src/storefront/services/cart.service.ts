import {parseGid} from '@shopify/hydrogen-react'

import {getPublicTokenHeaders, getStorefrontApiUrl} from '@/storefront/client'

import {GET_INVENTORIES_QUERY, GET_MAX_QTY_QUERY} from '../queries/cart.query'

/**
 * Get MaxQty metafield
 * @param id productId
 * @returns maxQty
 */
export async function getMaxQty(gid: string | undefined): Promise<number> {
  const response = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GET_MAX_QTY_QUERY,
      variables: {gid},
    }),
    headers: getPublicTokenHeaders(),
    method: 'POST',
  })

  const responseJson = await response.json()
  return Number(responseJson?.data?.product?.maxQty?.value) ?? null
}

/**
 * Get Inventories
 * @param id productIds
 * @returns inventories
 */
export async function getInventories(
  lines: any[] | undefined
): Promise<{inventories: object; valid: boolean}> {
  if (!lines) return {inventories: {}, valid: true}
  lines?.map((line) => line.merchandise.product.id ?? '') ?? []
  const response = await fetch(getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: GET_INVENTORIES_QUERY,
      variables: {
        query: lines.reduce(
          (result, line, index) =>
            `${result}${index ? ' OR ' : ''}id:'${parseGid(line.merchandise.product.id).id}'`,
          ''
        ),
      },
    }),
    method: 'POST',
    headers: getPublicTokenHeaders(),
  })
  const responseJson = await response.json()

  const inventories: any = {}
  responseJson.data.products.nodes.forEach((item: any) => {
    inventories[item.id] = item.totalInventory
  })
  lines
  return {
    inventories,
    valid: lines.every((line) => inventories[line.merchandise.product.id] >= line.quantity),
  }
}
