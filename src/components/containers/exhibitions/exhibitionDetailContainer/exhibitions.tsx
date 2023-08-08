import {
  ButtonModes,
  DzColumn,
  DzHero,
  DzInterstitial,
  DzTitleExhibition,
  INTERSTITIAL_TEXT_COLORS,
} from '@zwirner/design-system'
import {FC} from 'react'

import DzPortableText from '@/common/components/portableText'

import styles from './exhibitions.module.css'

interface ExhibitionsContainerProps {
  data: any
}

export const ExhibitionsContainer: FC<ExhibitionsContainerProps> = ({data}) => {
  data.location = data?.locations?.[0]

  return data ? (
    <>
      <DzColumn span={12} className={styles.titleContainer}>
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
    </>
  ) : null
}
