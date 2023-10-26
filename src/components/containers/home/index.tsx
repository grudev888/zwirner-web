import {DzColumn, DzTabsCards} from '@zwirner/design-system'
import cn from 'classnames'
import Link from 'next/link'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {PageBuilder} from '@/components/pageBuilder'

import styles from './home.module.css'
import {mapTabsLocations} from './mapper'

type HomeContainerProps = {
  data: any
}

export const HomeContainer = ({data}: HomeContainerProps) => {
  const {locations, title, homeContent} = data ?? {}
  const tabsLocations = mapTabsLocations(locations)

  return (
    <DzColumn span={12}>
      {title ? <h1 className="sr-only">{title}</h1> : null}
      <FullWidthFlexCol>
        {homeContent ? <PageBuilder components={homeContent} /> : null}
        <section>
          <h2 className="sr-only">Locations</h2>
          <DzTabsCards
            className={cn(styles.spacer, styles.fullSection)}
            tabs={tabsLocations}
            span={[12, 3]}
            LinkElement={Link}
          />
        </section>
      </FullWidthFlexCol>
    </DzColumn>
  )
}
