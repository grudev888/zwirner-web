import {BUTTON_VARIANTS, DzColumn, DzInterstitial, DzSectionMenu} from '@zwirner/design-system'
import {FC} from 'react'

import {
  CURRENT,
  EXHIBITIONS,
  MUSEUM_HIGHLIGHTS,
  NOW_OPEN,
  SUBSCRIBE,
  UPCOMING,
} from '@/common/constants/commonCopies'
import {ExhibitionMuseumHighlights} from '@/components/containers/exhibitions/exhibitionsLandingContainer/ExhibitionMuseumHighlights'
import {NowOpenExhibitions} from '@/components/containers/exhibitions/exhibitionsLandingContainer/NowOpenExhibitions'
import {UpcomingExhibitions} from '@/components/containers/exhibitions/exhibitionsLandingContainer/UpcomingExhibitions'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {PageBuilder} from '@/components/pageBuilder'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import PageSection from '@/components/wrappers/pageSection/PageSection'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ExhibitionLandingContainerProps {
  data: any
}

const SECTION_IDS = {
  UPCOMING: 'upcoming',
  CURRENT: 'current',
  MUSEUM_HIGHLIGHTS: 'museum-highlights',
}

export const ExhibitionLandingContainer: FC<ExhibitionLandingContainerProps> = ({data}) => {
  const {title, interstitial, museumHighlights, pageBuilder} = data ?? {}
  const interstitialProps = dzInterstitialOverrides(interstitial)
  return (
    <DzColumn span={12}>
      <DzSectionMenu
        cta={{
          text: SUBSCRIBE,
          ctaProps: {
            variant: BUTTON_VARIANTS.TERTIARY,
          },
        }}
        sticky
        usePrefix
        prefix=""
        sections={[
          {text: CURRENT, id: SECTION_IDS.CURRENT, url: `/exhibitions#${SECTION_IDS.CURRENT}`},
          {text: UPCOMING, id: SECTION_IDS.UPCOMING, url: `/exhibitions#${SECTION_IDS.UPCOMING}`},
          {
            text: MUSEUM_HIGHLIGHTS,
            id: SECTION_IDS.MUSEUM_HIGHLIGHTS,
            url: `/exhibitions#${SECTION_IDS.MUSEUM_HIGHLIGHTS}`,
          },
        ]}
      />
      <ContainerTitle title={title || EXHIBITIONS} />
      <FullWidthFlexCol>
        <PageBuilder components={pageBuilder?.introContent ?? []} />
        <PageSection title={NOW_OPEN} elementId={SECTION_IDS.CURRENT}>
          <NowOpenExhibitions data={data} />
        </PageSection>
        <PageSection title={UPCOMING} elementId={SECTION_IDS.UPCOMING}>
          <UpcomingExhibitions data={data} />
        </PageSection>
        {museumHighlights ? (
          <PageSection title={MUSEUM_HIGHLIGHTS} elementId={SECTION_IDS.MUSEUM_HIGHLIGHTS}>
            <ExhibitionMuseumHighlights data={data} />
          </PageSection>
        ) : null}
        <DzInterstitial {...interstitialProps} />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
