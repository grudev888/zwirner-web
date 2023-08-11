import {
  DzColumn,
  DzComplexGrid,
  DzInterstitial,
  DzSectionMenu,
  TITLE_SIZES,
} from '@zwirner/design-system'
import {useRouter} from 'next/router'
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
import {dzInterstitialMapper} from '@/common/utilsMappers/components/dzInterstitial.mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapCardsGrid} from './mapper'

interface ExhibitionChecklistContainerProps {
  data: any
}

export const ExhibitionChecklistContainer: FC<ExhibitionChecklistContainerProps> = ({data}) => {
  const router = useRouter()
  const {title, slug, showChecklist, subtitle, checklistInterstitial, checklist} = data ?? {}
  const interstitialData = dzInterstitialMapper({data: checklistInterstitial})
  const complexGridData = mapCardsGrid({
    data: {displayNumberOfResults: false, itemsPerRow: 2, items: checklist},
  })
  const currentSlug = slug?.current ?? ''

  return (
    <>
      <DzColumn span={12}>
        <DzSectionMenu
          sections={[
            {text: EXPLORE, id: 'explore', url: `${currentSlug}#explore`},
            ...(showChecklist
              ? [
                  {
                    text: CHECKLIST,
                    id: 'checklist',
                    url: `${currentSlug}${EXHIBITION_CHECKLIST_URL}`,
                  },
                ]
              : []),
            {
              text: INSTALLATION_VIEWS,
              id: 'installation-views',
              url: `${currentSlug}${EXHIBITION_INSTALLATION_URL}`,
            },
          ]}
          linksProps={{
            router,
            useRoute: true,
          }}
          sticky
          useLinks
        />
        <ContainerTitle
          title={`${title}: ${subtitle} — ${CHECKLIST}`}
          titleSize={TITLE_SIZES.XL}
          primaryCTA={{
            title: INQUIRE,
            description: INTERESTED_IN_THIS_EXHIBITION,
          }}
          customCTAContainerProps={{
            span: 6,
            start: 7,
          }}
          category={EXHIBITION}
        />
        <FullWidthFlexCol>
          {complexGridData && checklist ? <DzComplexGrid {...complexGridData} /> : null}
          {interstitialData && <DzInterstitial {...interstitialData} />}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
