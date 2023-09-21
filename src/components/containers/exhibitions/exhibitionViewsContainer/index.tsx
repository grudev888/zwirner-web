import {DzColumn, DzSectionMenu} from '@zwirner/design-system'
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

interface InstallationViewsContainerProps {
  data: any
}

export const InstallationViewsContainer: FC<InstallationViewsContainerProps> = ({data}) => {
  const router = useRouter()
  const {title, subtitle, showChecklist, installationViewsInterstitial, installationViews, slug} =
    data ?? {}
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
        />
        <ContainerTitle
          category={EXHIBITION}
          primaryCTA={{
            title: INQUIRE,
            description: INTERESTED_IN_THIS_EXHIBITION,
          }}
          title={`${title}: ${subtitle ? `${subtitle} — ` : ''}${INSTALLATION_VIEWS}`}
          customCTAContainerProps={{
            span: 6,
            start: 7,
          }}
          fullLeftContainer
        />
        <FullWidthFlexCol>
          {installationViews ? <PageBuilder components={[installationViews]} /> : null}
          {installationViewsInterstitial ? (
            <PageBuilder components={[installationViewsInterstitial]} />
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
