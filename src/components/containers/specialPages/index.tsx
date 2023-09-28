import {DzColumn} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import PageBuilder from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {PageBySlugType} from '@/sanity/queries/page/pageBySlug'

type Props = {
  data: PageBySlugType
}

export const SpecialPagesContainer = ({data}: Props) => {
  const {title, content} = data
  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} isWide={true} />
      <FullWidthFlexCol>{content ? <PageBuilder components={content} /> : null}</FullWidthFlexCol>
    </DzColumn>
  )
}
