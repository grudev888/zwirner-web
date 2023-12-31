import {DzColumn, DzTitleMoleculeTypes} from '@zwirner/design-system'
import DzSection from '@zwirner/design-system/src/atoms/DzSection'
import {useRouter} from 'next/router'

import {
  CHECKLIST,
  EXHIBITION_CHECKLIST_URL,
  EXHIBITION_INSTALLATION_URL,
  EXPLORE,
  INSTALLATION_VIEWS,
} from '@/common/constants/commonCopies'
import {fromToDatesText} from '@/common/utilsMappers/date.mapper'
import {getExhibitionState} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {
  createInquireModalExhibitionProps,
  useOpenInquiryDispatch,
} from '@/components/hooks/useOpenInquiryDispatch'
import {PageBuilder} from '@/components/pageBuilder'
import {dzMediaOverrides} from '@/components/pageBuilder/DzMedia/mediaMapper'
import {DzCard} from '@/components/wrappers/DzCardWrapper'
import {DzSectionMenu} from '@/components/wrappers/DzSectionMenuWrapper'
import {DzTitleExhibition} from '@/components/wrappers/DzTitleExhibitionWrapper'
import {DzTitleMolecule} from '@/components/wrappers/DzTitleMoleculeWrapper'
import {ModalTriggerEvent, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {ExhibitionPageBySlugType} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'
import {ModalTypes} from '@/sanity/types'

import styles from './exhibitions.module.css'

type Props = {
  data: ExhibitionPageBySlugType
}

export const ExhibitionsContainer = ({data: initialData}: Props) => {
  const router = useRouter()
  const {slug, showChecklist, startDate, endDate, heroMedia, showInstallationViews} = initialData
  const currentSlug = slug.current
  const inquireModalProps = createInquireModalExhibitionProps(initialData)
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

  const heroData = dzMediaOverrides({
    media: heroMedia,
    // TODO remove titles
    title: '',
  })

  const data = {
    ...initialData,
    location: initialData.locations?.[0],
    exhibitionState: getExhibitionState(initialData),
    exhibitionDateRangeText: fromToDatesText(startDate, endDate),
  }

  return data ? (
    <>
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
        className="col-span-12"
      />
      <DzColumn span={12}>
        {/* TODO: update design system types to accept 'null' in subtitle, checklistPDFURL, displayDate and pressReleasePDFURL*/}
        {data.artists && data.exhibitionState ? (
          <DzTitleExhibition
            artists={data.artists}
            checklistPDFURL={data.checklistPDFURL ?? undefined}
            displayDate={data.displayDate ?? undefined}
            exhibitionState={data.exhibitionState}
            exhibitionDateRangeText={data.exhibitionDateRangeText}
            location={data.location}
            pressReleasePDFURL={data.pressReleasePDFURL ?? undefined}
            title={data.title}
            subtitle={data.subtitle ?? undefined}
            showCoordinates
            onClickCTA={onClickInquire}
          />
        ) : null}
      </DzColumn>

      {heroData ? (
        <DzColumn span={12}>
          <DzCard {...(heroData as any)} />
        </DzColumn>
      ) : null}

      {data.pressRelease ? <PageBuilder components={[data.pressRelease]} /> : null}

      {data.exploreContent ? (
        <>
          <DzSection id="explore">
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.SECTION}
              data={{
                title: 'Explore',
                customClass: 'mb-5 md:mb-10',
              }}
            />
          </DzSection>
          <PageBuilder components={data.exploreContent} />
        </>
      ) : null}

      {data.interstitial && <PageBuilder components={[data.interstitial]} />}
      {/*TODO remove this when footer margin-top is applied globally */}
      <div className={styles.containerBottomGap} />
    </>
  ) : null
}
