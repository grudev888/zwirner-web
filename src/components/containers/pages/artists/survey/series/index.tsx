import {DzColumn} from '@zwirner/design-system'

import {SURVEY, SURVEY_URL} from '@/common/constants/commonCopies'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {showPageBuilderSection} from '@/components/pageBuilder'
import PageBuilder from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface PageContainerProps {
  data: any
}

const ArtistSurveySeriesPageContainer = ({data: queryData}: PageContainerProps) => {
  const [data] = queryData ?? []
  const {slug, title: parentPageTitle} = data?.artistDetailData ?? {}
  const {detailContent, title} = data?.seriesData ?? {}
  const parentPath = slug?.current

  return (
    <BackNavPageLayout
      parentPageName={`${parentPageTitle}: ${SURVEY}`}
      parentPath={`${parentPath}${SURVEY_URL}`}
    >
      <DzColumn className="!gap-y-[1rem]" span={12}>
        <ContainerTitle title={title} customTitleClass="italic" fullLeftContainer />
        {showPageBuilderSection(detailContent) ? <PageBuilder components={detailContent} /> : null}
      </DzColumn>
    </BackNavPageLayout>
  )
}

export default ArtistSurveySeriesPageContainer
