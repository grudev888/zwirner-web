import {DzColumn} from '@zwirner/design-system'
import {useRouter} from 'next/router'

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
import {
  createInquireModalExhibitionProps,
  useOpenInquiryDispatch,
} from '@/components/hooks/useOpenInquiryDispatch'
import {PageBuilder} from '@/components/pageBuilder'
import {DzSectionMenu} from '@/components/wrappers/DzSectionMenuWrapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {ModalTriggerEvent, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {ModalTypes} from '@/sanity/types'

type InstallationViewsContainerProps = {
  data: any
}

export const InstallationViewsContainer = ({data}: InstallationViewsContainerProps) => {
  const router = useRouter()
  const {
    title,
    subtitle,
    showChecklist,
    installationViewsInterstitial,
    installationViews,
    slug,
    showInstallationViews,
  } = data ?? {}
  const currentSlug = slug?.current ?? ''

  const inquireModalProps = createInquireModalExhibitionProps(data)
  const onClickInquire = () => {
    window.document.dispatchEvent(
      ModalTriggerEvent({
        modalType: ModalTypes.INQUIRE,
        props: inquireModalProps,
        triggerType: ModalTriggerTypes.CTA,
      })
    )
  }
  useOpenInquiryDispatch(inquireModalProps)

  return (
    <>
      <DzColumn span={12}>
        <DzSectionMenu
          sections={[
            {text: EXPLORE, id: 'explore', url: `${currentSlug}`},
            {
              text: CHECKLIST,
              id: 'checklist',
              url: `${currentSlug}${EXHIBITION_CHECKLIST_URL}`,
              hidden: !showChecklist,
            },
            {
              text: INSTALLATION_VIEWS,
              id: 'installation-views',
              url: `${currentSlug}${EXHIBITION_INSTALLATION_URL}`,
              hidden: !showInstallationViews,
            },
          ]}
          linksProps={{
            router,
            useRoute: true,
          }}
          sticky
        />
        <ContainerTitle
          category={EXHIBITION}
          primaryCTA={{
            title: INQUIRE,
            description: INTERESTED_IN_THIS_EXHIBITION,
            ctaProps: {
              onClick: onClickInquire,
            },
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
