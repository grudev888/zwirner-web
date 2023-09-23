import {withSentryConfig} from '@sentry/nextjs'
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
