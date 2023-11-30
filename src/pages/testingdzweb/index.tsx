import {DzColumn} from '@zwirner/design-system'
import React, {FC} from 'react'

interface GtmExampleProps {}

const GtmExample: FC<GtmExampleProps> = ({}) => {
  return (
    <DzColumn span={12}>
      <hr />
      <br />
      <h2 className="text-lg">Test GA4 Exit Link Event</h2>
      <br />
      <a href="https://app.slack.com/">Go to Slack</a>

      <hr />
      <h2 className="text-lg">Test Sentry</h2>
      <br />
      <button
        onClick={() => {
          throw Error('Test Sentry')
        }}
      >
        Test Sentry
      </button>
    </DzColumn>
  )
}

export default GtmExample
