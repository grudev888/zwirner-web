import {DzColumn, DzTitle} from '@zwirner/design-system'
import cn from 'classnames'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import styles from './artwork.module.css'
import {} from './mapper'

interface ArtworkContainerProps {
  data: any
}

export const ArtworkContainer: FC<ArtworkContainerProps> = ({data}) => {
  const {title} = data ?? {}
  console.log('props data', data)

  return (
    <DzColumn span={12}>
      <FullWidthFlexCol>
        <DzTitle
          {...title}
          className={cn(styles.infoTitleContainer)}
          classNameTitle={styles.infoTitle}
          classNameSubtitle={styles.infoTitle}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
