import {DzColumn} from '@zwirner/design-system'

import {SURVEY} from '@/common/constants/commonCopies'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {showPageBuilderSection} from '@/components/pageBuilder'
import PageBuilder from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
interface PageContainerProps {
  data: any
}

const ArtistSurveyPageContainer = ({data}: PageContainerProps) => {
  const {surveySubpage, artist} = data ?? {}

  const {fullName} = artist ?? {}

  const parentPath = data?.slug?.current
  const parentPageTitle = data?.title

  return (
    <BackNavPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        <ContainerTitle title={`${SURVEY}${fullName ? `: ${fullName}` : ''}`} fullLeftContainer />
      </DzColumn>

      {showPageBuilderSection(surveySubpage) ? (
        <PageBuilder components={surveySubpage} innerSection />
      ) : null}
    </BackNavPageLayout>
  )
}

export default ArtistSurveyPageContainer
