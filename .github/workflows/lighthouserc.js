const APP_URL = process.env.ENVIRONMENT_URL

module.exports = {
  ci: {
    collect: {
      url: [
        `${APP_URL}/`,
        `${APP_URL}/artists`,
        `${APP_URL}/exhibitions`,
        `${APP_URL}/available-artworks`,
        `${APP_URL}/artists/tomma-abts`,
        `${APP_URL}/artists/tomma-abts/survey`,
        `${APP_URL}/artists/tomma-abts/guide`,
        `${APP_URL}/artists/tomma-abts/press`,
        `${APP_URL}/artworks/tomma-abts-oeje-7a744`,
        `${APP_URL}/news/2018/tomma-abts-in-berlin`,
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop'
      }
    },
    assert: {
      preset: 'lighthouse:no-pwa'
    },
    upload: {
      target: 'temporary-public-storage',
      githubStatusContextSuffix: '/desktop'
    }
  }
}
