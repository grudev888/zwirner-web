import {
  ButtonModes,
  DzColumn,
  DzHero,
  DzInterstitial,
  DzSectionMenu,
  DzTitleExhibition,
  INTERSTITIAL_TEXT_COLORS,
} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {FC} from 'react'

import DzPortableText from '@/common/components/portableText'
import {
  CHECKLIST,
  EXHIBITION_CHECKLIST_URL,
  EXHIBITION_INSTALLATION_URL,
  EXPLORE,
  INSTALLATION_VIEWS,
} from '@/common/constants/commonCopies'

import styles from './exhibitions.module.css'

interface ExhibitionsContainerProps {
  data: any
}

export const ExhibitionsContainer: FC<ExhibitionsContainerProps> = ({data}) => {
  const router = useRouter()
  const {slug, showChecklist} = data ?? {}
  data.location = data?.locations?.[0]

  const currentSlug = slug?.current ?? ''

  return data ? (
    <>
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
        <DzTitleExhibition {...data} />
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
        <DzColumn span={[12, 6]} start={[1, 4]} className={styles.pressReleaseContainer}>
          <DzPortableText portableProps={{value: data.pressRelease}} />
        </DzColumn>
      )}
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