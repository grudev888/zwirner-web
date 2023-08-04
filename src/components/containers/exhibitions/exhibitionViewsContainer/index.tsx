import {
  CARD_TYPES,
  DzColumn,
  DzComplexGrid,
  DzInterstitial,
  DzSectionMenu,
} from '@zwirner/design-system'
import {FC} from 'react'

import {
  CHECKLIST,
  EXHIBITION,
  EXHIBITION_CHECKLIST_URL,
  EXHIBITION_INSTALLATION_URL,
  EXPLORE,
  INQUIRE,
  INSTALLATION_VIEWS,
  INTERESTED_IN_THIS_EXHIBITION,
} from '@/common/constants/commonCopies'
import {dzComplexGridMapper} from '@/common/utilsMappers/components/dzComplexGrid.mapper'
import {dzInterstitialMapper} from '@/common/utilsMappers/components/dzInterstitial.mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface InstallationViewsContainerProps {
  data: any
}

export const InstallationViewsContainer: FC<InstallationViewsContainerProps> = ({data}) => {
  const {title, installationViewsInterstitial, installationViews, slug} = data ?? {}
  const interstitialData = dzInterstitialMapper({data: installationViewsInterstitial})
  const complexGridData = dzComplexGridMapper({
    data: {displayNumberOfResults: false, itemsPerRow: 2, items: installationViews},
    cardType: CARD_TYPES.MEDIA,
    options: {gridColumnsStyles: '!gap-y-5'},
    imageOptions: {className: 'h-full'},
  })
  const currentSlug = slug?.current ?? ''

  return (
    <>
      <DzColumn span={12}>
        <DzSectionMenu
          sections={[
            {text: EXPLORE, id: 'explore', url: `${currentSlug}#explore`},
            {text: CHECKLIST, id: 'checklist', url: `${currentSlug}${EXHIBITION_CHECKLIST_URL}`},
            {
              text: INSTALLATION_VIEWS,
              id: 'installation-views',
              url: `${currentSlug}${EXHIBITION_INSTALLATION_URL}`,
            },
          ]}
          sticky
          useLinks
        />
        <ContainerTitle
          category={EXHIBITION}
          primaryCTA={{
            title: INQUIRE,
            description: INTERESTED_IN_THIS_EXHIBITION,
          }}
          title={`${title}— Installation Views`}
          customCTAContainerProps={{
            span: 6,
            start: 7,
          }}
          fullLeftContainer
        />
        <FullWidthFlexCol>
          {complexGridData ? <DzComplexGrid {...complexGridData} /> : null}
          {interstitialData && <DzInterstitial {...interstitialData} />}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
