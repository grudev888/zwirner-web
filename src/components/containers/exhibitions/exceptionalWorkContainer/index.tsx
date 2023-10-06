import {DzColumn} from '@zwirner/design-system'

import {PageBuilder} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {ExceptionalWorksDataType} from '@/sanity/queries/exhibitions/exceptionalWorksData'
type Props = {
  data: ExceptionalWorksDataType
}

export const ExceptionalWorkContainer = ({data}: Props) => {
  const {exceptionalWorkContent, title} = data
  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} isWide={true} />
      {exceptionalWorkContent ? <PageBuilder components={exceptionalWorkContent} /> : null}
    </DzColumn>
  )
}
