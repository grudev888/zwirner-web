import {
  DzColumn,
  DzHero,
  DzSectionMenu,
  DzTitleExhibition,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  FORM_MODAL_TYPES,
} from '@zwirner/design-system'
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
import {ExhibitionPageBySlugType} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'

import styles from './exhibitions.module.css'
import {heroMapper} from './mapper'

type Props = {
  data: ExhibitionPageBySlugType
}

export const ExhibitionsContainer = ({data: initialData}: Props) => {
  const router = useRouter()
  const inquireFormModalProps = useHashRoutedInquiryModal()
  const {slug, showChecklist, startDate, endDate, title, subtitle} = initialData
  const exhibitionTitle = `${title}${subtitle ? `: ${subtitle}` : ''}`
  const currentSlug = slug.current
  const heroData = heroMapper(initialData)

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
          />
        ) : null}
      </DzColumn>

      <DzColumn span={12}>
        {heroData && <DzHero className={styles.heroContainer} items={[heroData]} />}
      </DzColumn>

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
