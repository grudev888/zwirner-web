import {DzColumn} from '@zwirner/design-system'

import {PageBuilder} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {OnlineExhibitionsType} from '@/sanity/queries/exhibitions/onlineExhibitionsData'
type Props = {
  data: OnlineExhibitionsType
}

export const OnlineExhibitionsContainer = ({data}: Props) => {
  const {onlineExhibitionContent, title, interstitial} = data

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} isWide={true} />
      {onlineExhibitionContent ? <PageBuilder components={onlineExhibitionContent} /> : null}
      {interstitial && <PageBuilder components={[interstitial]} />}
    </DzColumn>
  )
}
