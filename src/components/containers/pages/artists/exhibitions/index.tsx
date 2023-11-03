import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'

import {EXHIBITIONS} from '@/common/constants/commonCopies'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import PageBuilder from '@/components/pageBuilder'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {transformDataToGrid} from '@/components/pageBuilder/utils/transformers'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

type PageContainerProps = {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.slug.current
  const parentPageTitle = data?.artist?.fullName

  const title = `${EXHIBITIONS}: ${parentPageTitle}`

  const dzGridPageBuilder = transformDataToGrid({
    data: data?.artist?.exhibitions,
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: 3,
      wrap: false,
      title: '',
      displayGridSlider: false,
      displayNumberOfItems: false,
    },
  })

  return (
    <BackNavPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        {parentPageTitle && <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />}
        {showGridSection(dzGridPageBuilder) ? (
          <PageBuilder components={[dzGridPageBuilder]} />
        ) : null}
        {showInterstitialSection(data?.exhibitionsInterstitialSubpage) ? (
          <PageBuilder components={[data?.exhibitionsInterstitialSubpage]} />
        ) : null}
      </DzColumn>
    </BackNavPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
