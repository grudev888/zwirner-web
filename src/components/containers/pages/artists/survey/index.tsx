import {DzColumn} from '@zwirner/design-system'

import {SURVEY} from '@/common/constants/commonCopies'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {showPageBuilderSection} from '@/components/pageBuilder'
import PageBuilder from '@/components/pageBuilder'
import {transformDataToGrid} from '@/components/pageBuilder/utils/transformers'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
interface PageContainerProps {
  data: any
}

const ArtistSurveyPageContainer = ({data: queryData}: PageContainerProps) => {
  const [data] = queryData ?? []
  const {surveySubpage, artist, surveySeries} = data ?? {}
  const {fullName} = artist ?? {}

  const parentPath = data?.slug?.current
  const parentPageTitle = data?.title
  const dzGridPageBuilder = transformDataToGrid({
    data: surveySeries,
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: 2,
      wrap: false,
      title: '',
      displayGridSlider: false,
      displayNumberOfItems: false,
    },
  })

  return (
    <BackNavPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn className="!gap-y-[1rem]" span={12}>
        <ContainerTitle title={`${SURVEY}${fullName ? `: ${fullName}` : ''}`} fullLeftContainer />
        {!surveySeries && showPageBuilderSection(surveySubpage) ? (
          <PageBuilder components={surveySubpage} innerSection />
        ) : null}
        <PageBuilder components={[dzGridPageBuilder]} />
      </DzColumn>
    </BackNavPageLayout>
  )
}

export default ArtistSurveyPageContainer
