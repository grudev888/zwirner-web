import {DzColumn, DzInterstitial, TITLE_SIZES} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {Fragment} from 'react'

import {EXHIBITIONS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapCardsGrid} from './mapper'
import styles from './styles.module.css'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.slug.current
  const parentPageTitle = data?.artist?.fullName
  const complexGridCards = mapCardsGrid(data?.artist?.exhibitions)
  const title = `${EXHIBITIONS}: ${parentPageTitle}`
  const interstitialData = dzInterstitialOverrides(data?.exhibitionsInterstitialSubpage)

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
