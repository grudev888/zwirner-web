import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ExhibitionLandingContainerProps {
  data: any
}

export const ExhibitionLandingContainer: FC<ExhibitionLandingContainerProps> = ({data}) => {
  const {title} = data ?? {}

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} />
        <FullWidthFlexCol>
          <p>Exhibition landing page content ...</p>
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
