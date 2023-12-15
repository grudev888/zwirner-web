import {DzColumn, DzSpinner} from '@zwirner/design-system'
import React, {FC} from 'react'

interface GtmExampleProps {}

const GtmExample: FC<GtmExampleProps> = ({}) => {
  return (
    <DzColumn span={12}>
      <DzSpinner />
    </DzColumn>
  )
}

export default GtmExample
