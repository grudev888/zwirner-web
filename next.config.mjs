import analyzer from '@next/bundle-analyzer'
import {withSentryConfig} from '@sentry/nextjs'
import path from 'path'
import {fileURLToPath} from 'url'

const {env} = await import('./src/env.mjs')
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const config = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {remotePatterns: [{hostname: 'cdn.sanity.io'}]},
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
}

const withBundleAnalyzer = analyzer({
  enabled: env.ANALYZE,
})

export default withSentryConfig(
  withBundleAnalyzer(config),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'zwirner',
    project: 'web',
  },
  {
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
)
