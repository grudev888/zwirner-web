import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ExhibitionChecklistContainerProps {
  data: any
}

export const ExhibitionChecklistContainer: FC<ExhibitionChecklistContainerProps> = ({data}) => {
  const {title} = data ?? {}

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} />
        <FullWidthFlexCol>
          <p>Exhibition checklist page content ...</p>
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
