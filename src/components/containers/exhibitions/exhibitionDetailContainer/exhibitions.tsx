import {
  DzColumn,
  DzSectionMenu,
  DzTitleExhibition,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  FORM_MODAL_TYPES,
  INQUIRY_TYPES,
} from '@zwirner/design-system'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {
  CHECKLIST,
  EXHIBITION_CHECKLIST_URL,
  EXHIBITION_INSTALLATION_URL,
  EXPLORE,
  INSTALLATION_VIEWS,
  PLEASE_PROVIDE_YOUR_CONTACT,
  TO_LEARN_MORE_ABOUT,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {
  formatDateRange,
  getExhibitionState,
} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {PageBuilder} from '@/components/pageBuilder'
import {dzMediaOverrides} from '@/components/pageBuilder/DzMedia/mediaMapper'
import {DzCard} from '@/components/wrappers/DzCardWrapper'
import {ExhibitionPageBySlugType} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'

import styles from './exhibitions.module.css'

type Props = {
  data: ExhibitionPageBySlugType
}

export const ExhibitionsContainer = ({data: initialData}: Props) => {
  const router = useRouter()
  const inquireFormModalProps = useHashRoutedInquiryModal({
    inquiryType: INQUIRY_TYPES.EXHIBITION,
    id: initialData?._id,
    title: initialData?.title,
    ctaText: 'Inquire',
  })
  const {slug, showChecklist, startDate, endDate, title, subtitle, heroMedia} = initialData
  const exhibitionTitle = `${title}${subtitle ? `: ${subtitle}` : ''}`
  const currentSlug = slug.current
  const heroData = dzMediaOverrides({
    media: heroMedia,
    // TODO remove titles
    title: '',
  })

  const data = {
    ...initialData,
    location: initialData.locations?.[0],
    exhibitionState: getExhibitionState(initialData),
    exhibitionDateRangeText: formatDateRange(startDate, endDate),
  }

  return data ? (
    <>
      <RecaptchaInquireFormModal
        type={FORM_MODAL_TYPES.INQUIRE}
        {...inquireFormModalProps}
        title={WANT_TO_KNOW_MORE}
        subtitle={`${TO_LEARN_MORE_ABOUT} ${exhibitionTitle}, ${PLEASE_PROVIDE_YOUR_CONTACT}`}
      />

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
        className="col-span-12"
        LinkElement={Link}
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
            onClickCTA={inquireFormModalProps.openClickHandler}
            LinkElement={Link}
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
          <section id="explore">
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.SECTION}
              data={{
                title: 'Explore',
                customClass: 'mb-5 md:mb-10',
              }}
              LinkElement={Link}
            />
          </section>
          <PageBuilder components={data.exploreContent} />
        </>
      ) : null}

      {data.interstitial && <PageBuilder components={[data.interstitial]} />}
      {/*TODO remove this when footer margin-top is applied globally */}
      <div className={styles.containerBottomGap} />
    </>
  ) : null
}
