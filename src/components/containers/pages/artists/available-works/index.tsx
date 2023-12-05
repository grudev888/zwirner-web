import {DzColumn} from '@zwirner/design-system'

import {AVAILABLE_WORKS} from '@/common/constants/commonCopies'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import PageBuilder, {showPageBuilderSection} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
interface PageContainerProps {
  data: any
}

const ArtistAvailableWorksPageContainer = ({data: queryData}: PageContainerProps) => {
  const [data] = queryData ?? []

  const {artist, availableWorksSubpage} = data ?? {}
  const {fullName} = artist ?? {}

  const parentPath = data?.slug?.current
  const parentPageTitle = data?.title

  return (
    <BackNavPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn className="!gap-y-[1rem]" span={12}>
        <ContainerTitle
          title={`${AVAILABLE_WORKS}${fullName ? `: ${fullName}` : ''}`}
          fullLeftContainer
        />
        {availableWorksSubpage && showPageBuilderSection(availableWorksSubpage) ? (
          <PageBuilder components={availableWorksSubpage} innerSection />
        ) : null}
      </DzColumn>
    </BackNavPageLayout>
  )
}

export default ArtistAvailableWorksPageContainer
