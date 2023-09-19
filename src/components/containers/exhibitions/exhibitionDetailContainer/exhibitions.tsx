import {
  ButtonModes,
  DzColumn,
  DzHero,
  DzInquireFormModal,
  DzInterstitial,
  DzSectionMenu,
  DzTitleExhibition,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  INTERSTITIAL_TEXT_COLORS,
} from '@zwirner/design-system'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FC} from 'react'

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
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import {PageBuilder} from '@/components/pageBuilder'
import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {builder} from '@/sanity/imageBuilder'

import styles from './exhibitions.module.css'

interface ExhibitionsContainerProps {
  data: any
}

export const ExhibitionsContainer: FC<ExhibitionsContainerProps> = ({data}) => {
  const router = useRouter()
  const inquireFormModalProps = useHashRoutedInquiryModal()
  const {slug, showChecklist, startDate, endDate, title, subtitle} = data ?? {}
  const exhibitionTitle = `${title}${subtitle ? `: ${subtitle}` : ''}`
  const currentSlug = slug?.current ?? ''

  data.location = data?.locations?.[0]
  data.exhibitionState = getExhibitionState(data)
  data.exhibitionDateRangeText = formatDateRange(startDate, endDate)

  return data ? (
    <>
      <DzInquireFormModal
        {...inquireFormModalProps}
        title={WANT_TO_KNOW_MORE}
        subtitle={`${TO_LEARN_MORE_ABOUT} ${exhibitionTitle}, ${PLEASE_PROVIDE_YOUR_CONTACT}`}
      />
      <DzColumn span={12} className={styles.titleContainer}>
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
        <DzTitleExhibition
          {...data}
          showCoordinates
          onClickCTA={inquireFormModalProps.openClickHandler}
        />
      </DzColumn>
      <DzColumn span={12}>
        {data.heroMedia?.image && (
          <DzHero
            className={styles.heroContainer}
            items={[
              {
                title: '',
                media: {
                  type: data.heroMedia?.type,
                  imgProps: {
                    src: data.heroMedia?.image?.url,
                    alt: 'Hero Image',
                  },
                },
              },
            ]}
          />
        )}
      </DzColumn>

      {data.pressRelease && (
        <DzColumn wrap span={[12, 6]} start={[1, 4]} className={styles.pressReleaseContainer}>
          <DzPortableText
            portableProps={{value: data.pressRelease}}
            builder={builder}
            ImgElement={Image}
          />
        </DzColumn>
      )}

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

      {data.interstitial && (
        <DzColumn span={12}>
          <DzInterstitial
            data={{
              textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
              title: data.interstitial.title,
              description: data.interstitial.subtitle,
              split: false,
              primaryCta: {
                ...(data.interstitial.cta || {}),
                ctaProps: {
                  mode: ButtonModes.DARK,
                },
              },
            }}
          />
        </DzColumn>
      )}
      {/*TODO remove this when footer margin-top is applied globally */}
      <div className={styles.containerBottomGap} />
    </>
  ) : null
}
