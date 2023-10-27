import {BUTTON_VARIANTS, DzColumn, DzSectionMenu} from '@zwirner/design-system'
import Link from 'next/link'

import {
  CURRENT,
  EXHIBITIONS,
  MUSEUM_HIGHLIGHTS,
  NOW_OPEN,
  SUBSCRIBE,
  UPCOMING,
} from '@/common/constants/commonCopies'
import {NowOpenExhibitions} from '@/components/containers/exhibitions/exhibitionsLandingContainer/NowOpenExhibitions'
import {UpcomingExhibitions} from '@/components/containers/exhibitions/exhibitionsLandingContainer/UpcomingExhibitions'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {PageBuilder} from '@/components/pageBuilder'
import PageSection from '@/components/wrappers/pageSection/PageSection'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

type ExhibitionLandingContainerProps = {
  data: any
}

const SECTION_IDS = {
  UPCOMING: 'upcoming',
  CURRENT: 'current',
  MUSEUM_HIGHLIGHTS: 'museum-highlights',
}

export const ExhibitionLandingContainer = ({data}: ExhibitionLandingContainerProps) => {
  const {title, pageBuilder, museumHighlights, interstitial} = data ?? {}
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
        LinkElement={Link}
      />
      <ContainerTitle title={title || EXHIBITIONS} />
      <FullWidthFlexCol>
        {pageBuilder.introContent ? <PageBuilder components={pageBuilder?.introContent} /> : null}
        <PageSection title={NOW_OPEN} elementId={SECTION_IDS.CURRENT}>
          <NowOpenExhibitions data={data} />
        </PageSection>
        <PageSection title={UPCOMING} elementId={SECTION_IDS.UPCOMING}>
          <UpcomingExhibitions data={data} />
        </PageSection>
        {data.subscribeInterstitial ? (
          <PageBuilder components={[data.subscribeInterstitial]} />
        ) : null}
        {museumHighlights ? (
          <PageSection title={MUSEUM_HIGHLIGHTS} elementId={SECTION_IDS.MUSEUM_HIGHLIGHTS}>
            {museumHighlights ? <PageBuilder components={[museumHighlights]} /> : null}
          </PageSection>
        ) : null}
        {interstitial ? <PageBuilder components={[interstitial]} /> : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
