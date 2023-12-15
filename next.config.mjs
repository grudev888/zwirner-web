import analyzer from '@next/bundle-analyzer'
import {withSentryConfig} from '@sentry/nextjs'
import path from 'path'
import {fileURLToPath} from 'url'

const {env} = await import('./src/env.mjs')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withBundleAnalyzer = analyzer({
  enabled: env.ANALYZE,
})

const sentryOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
}

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'zwirner',
  project: 'web',

  // Suppresses source map uploading logs during build if set to true
  silent: true,

  // An auth token is required for uploading source maps.
  authToken: env.SENTRY_AUTH_TOKEN,
}

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [{hostname: 'cdn.sanity.io'}, {hostname: 'cdn.shopify.com'}],
  },
  transpilePackages: ['@zwirner/design-system', '@vime/react'],
  webpack: (config) => {
    // This fixes the invalid hook React error which
    // will occur when multiple versions of React is detected when using yarn link
    const reactPaths = {
      react: path.join(__dirname, 'node_modules/react'),
      'react-dom': path.join(__dirname, 'node_modules/react-dom'),
    }
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...reactPaths,
      },
    }
    return config
  },
  redirects: async () => {
    return [
      {
        source: '/artist/:path',
        destination: '/artists/:path',
        statusCode: 301,
      },
      {
        source: '/artists/:name/biography',
        destination: '/artists/:name',
        statusCode: 301,
      },
      {
        source:
          '/artists/:name/:exhibitionType(past-exhibitions|current-exhibitions|upcoming-exhibitions)',
        destination: '/artists/:name/exhibitions',
        statusCode: 301,
      },
      {
        source: '/artists/:name/artist-press',
        destination: '/artists/:name/press',
        statusCode: 301,
      },
      {
        source: '/artists/:name/available-works',
        destination: '/artists/:name/available-artworks',
        statusCode: 301,
      },
      {
        source:
          '/artists/thomas-ruff/:series(dope|bonfils|tableaux-russes|tableaux-chinois|' +
          'flowers|tripe|wgl-and-mnop|press-series|negatives|photograms|mars|cassini|' +
          'zycles|jpegs|machines|substratum|nudes|lmvdr|other-portraits|nights|' +
          'blaue-augen|herzog-and-de-meuron|newspaper-photographs|stars|houses|' +
          'lempereur|portraits|interiors)',
        destination: '/artists/thomas-ruff/survey/:series',
        statusCode: 301,
      },
    ]
  },
}

export default withSentryConfig(
  withBundleAnalyzer(config),
  sentryWebpackPluginOptions,
  sentryOptions
)
