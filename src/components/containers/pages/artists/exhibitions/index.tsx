import {DzColumn, DzComplexGrid, DzInterstitial, TITLE_SIZES} from '@zwirner/design-system'
import {Fragment} from 'react'

import {EXHIBITIONS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {interstitialMap, mapCardsGrid} from './mapper'
import styles from './styles.module.css'
interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.slug.current
  const parentPageTitle = data?.artist?.fullName
  const complexGridCards = mapCardsGrid(data?.artist?.exhibitions)
  const title = `${EXHIBITIONS}: ${parentPageTitle}`
  const interstitialData = interstitialMap(data?.exhibitionsInterstitialSubpage)

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        {parentPageTitle && <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />}
        <FullWidthFlexCol>
          <DzComplexGrid
            cards={complexGridCards}
            /* Effectively hides the view slider */
            steps={[
              {
                id: 1,
                // TODO externalize this value to CMS
                numberOfColumns: 3,
                icon: <Fragment />,
              },
            ]}
          />
        </FullWidthFlexCol>
        {interstitialData && (
          <div className={styles.interstitialWrapper}>
            <DzInterstitial {...interstitialData} />
          </div>
        )}
      </DzColumn>
    </ArtistsPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
