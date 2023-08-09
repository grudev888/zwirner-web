import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'

import {config} from '@/sanity/client'

export const videoBuilder = (asset: any) => {
  const parts = parseAssetId(asset._ref)
  return buildFileUrl(parts, config)
}
