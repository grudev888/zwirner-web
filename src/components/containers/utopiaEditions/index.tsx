import {DzColumn, DzInterstitial, DzMedia, DzTitle, TITLE_TYPES} from '@zwirner/design-system'
import {FC} from 'react'

import {interstitialNewReleasesMap, utopiaMainMediaMap} from './mapper'
import styles from './utopia.module.css'

interface UtopiaEditionsProps {
  data: any
}

export const UtopiaEditionsContainer: FC<UtopiaEditionsProps> = ({data}) => {
  const {title, media, newReleasesInterstitial} = data ?? {}
  const mediaProps = utopiaMainMediaMap(media)
  const interstitialProps = interstitialNewReleasesMap(newReleasesInterstitial)

  return (
    <DzColumn span={12}>
      <DzTitle
        title={title}
        titleType={TITLE_TYPES.H1}
        classNameTitle={styles.pageTitle}
        className={styles.pageTitleContainer}
      />
      <div className={styles.pageContainer}>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
        <DzInterstitial data={{...interstitialProps, customTitleClass: styles.interstitialTitle}} />
      </div>
    </DzColumn>
  )
}
