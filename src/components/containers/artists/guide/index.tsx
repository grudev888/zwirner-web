import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {GUIDE} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import PageBuilder from '@/components/pageBuilder'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ArtistGuideContainerProps {
  data: any
}

export const ArtistGuideContainer: FC<ArtistGuideContainerProps> = ({data: queryData}) => {
  const [data] = queryData ?? []
  const {artist, title: parentPageName, guideSubpage, guideInterstitialSubpage, slug} = data ?? {}
  const {fullName} = artist ?? {}

  return (
    <BackNavPageLayout parentPageName={parentPageName} parentPath={slug?.current}>
      <DzColumn span={12}>
        <ContainerTitle title={`${GUIDE}${fullName ? `: ${fullName}` : ''}`} />

        <FullWidthFlexCol>
          {/* Page Builder GRID for guide items*/}
          {showGridSection(guideSubpage) ? (
            <PageBuilder
              components={[
                {
                  ...guideSubpage,
                  props: {
                    ...guideSubpage.props,
                    itemsPerRow: 4,
                    wrap: false,
                    displayNumberOfItems: false,
                    displayGridSlider: false,
                  },
                },
              ]}
            />
          ) : null}

          {/* Page Builder INTERSTITIAL for exhibitions*/}
          {showInterstitialSection(guideInterstitialSubpage) ? (
            <PageBuilder components={[guideInterstitialSubpage]} />
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </BackNavPageLayout>
  )
}
