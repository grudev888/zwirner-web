import {test as base} from '@playwright/test'

const IGNORED_MESSAGES: (string | RegExp)[] = [
  'Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.',
  // Issue already reported but not addressed by the library maintainers https://github.com/videojs/videojs-youtube/issues/527
  /Failed to execute 'postMessage' on 'DOMWindow': The target origin provided \('(.*)'\) does not match the recipient window's origin \('(.*)'\)/,
  // Related to the dev environment, not happening in production
  'Content Security Policy: The page’s settings blocked the loading of a resource at eval (“script-src”).',
]

export const test = base.extend<{checkLogs: void}>({
  checkLogs: [
    async ({page}, use, testInfo) => {
      const logs: string[] = []
      page.on('console', (consoleMessage: any) => {
        if (consoleMessage.type() === 'error') {
          const text = consoleMessage.text()

          if (
            !IGNORED_MESSAGES.some((msg) =>
              typeof msg === 'string' ? text === msg : (msg as RegExp).test(text)
            )
          ) {
            logs.push(text)
          }
        }
      })

      await use()

      if (logs.length === 0 || testInfo.status !== 'passed') {
        return
      }

      // eslint-disable-next-line no-param-reassign
      testInfo.status = 'failed'
      // eslint-disable-next-line no-param-reassign
      testInfo.error = {
        message: `Console errors present: ${logs.join('\n')}`,
      }
    },
    {auto: true},
  ],
})

export {expect} from '@playwright/test'
