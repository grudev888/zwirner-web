import analyzer from '@next/bundle-analyzer'
const {env} = await import('./src/env.mjs')

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {remotePatterns: [{hostname: 'cdn.sanity.io'}]},
  transpilePackages: ['@zwirner/design-system'],
}

const withBundleAnalyzer = analyzer({
  enabled: env.ANALYZE,
})

export default withBundleAnalyzer(config)
