import {DzColumn, DzTabsCards} from '@zwirner/design-system'
import cn from 'classnames'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {PageBuilder} from '@/components/pageBuilder'

import styles from './home.module.css'
import {mapTabsLocations} from './mapper'
interface HomeContainerProps {
  data: any
}

export const HomeContainer: FC<HomeContainerProps> = ({data}) => {
  const {locations, exceptionalWorkContent} = data ?? {}
  const tabsLocations = mapTabsLocations(locations)

  return (
    <DzColumn span={12}>
      <h1 className="sr-only">David Zwirner Gallery</h1>
      <FullWidthFlexCol>
        {exceptionalWorkContent ? <PageBuilder components={exceptionalWorkContent} /> : null}
        <section>
          <h2 className="sr-only">Locations</h2>
          <DzTabsCards
            className={cn(styles.spacer, styles.fullSection)}
            tabs={tabsLocations}
            span={[12, 3]}
          />
        </section>
      </FullWidthFlexCol>
    </DzColumn>
  )
}
