import {DzColumn, DzSectionMenu, TITLE_SIZES} from '@zwirner/design-system'
import Link from 'next/link'
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
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {PageBuilder} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ExhibitionChecklistContainerProps {
  data: any
}

export const ExhibitionChecklistContainer: FC<ExhibitionChecklistContainerProps> = ({data}) => {
  const router = useRouter()
  const {title, slug, showChecklist, subtitle, checklistInterstitial, checklist} = data ?? {}
  const currentSlug = slug?.current ?? ''

  return (
    <>
      <DzColumn span={12}>
        <DzSectionMenu
          sections={[
            {text: EXPLORE, id: 'explore', url: `${currentSlug}`},
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
          LinkElement={Link}
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
          {checklist ? <PageBuilder components={[checklist]} /> : null}
          {checklistInterstitial ? <PageBuilder components={[checklistInterstitial]} /> : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
