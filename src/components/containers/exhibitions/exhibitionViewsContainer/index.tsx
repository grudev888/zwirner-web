import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface InstallationViewsContainerProps {
  data: any
}

export const InstallationViewsContainer: FC<InstallationViewsContainerProps> = ({data}) => {
  const {title} = data ?? {}

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} />
        <FullWidthFlexCol>
          <p>Installation view page content ...</p>
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
