import analyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  reactStrictMode: true,
}

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(config)
