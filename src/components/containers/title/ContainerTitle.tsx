import {FC} from 'react'
import {DzTitle, DzTitleProps} from '@zwirner/design-system'

import styles from './titles.module.css'

export const ContainerTitle: FC<DzTitleProps> = (props) => {
  return (
    <DzTitle
      classNameTitle={styles.pageTitle}
      className={styles.pageTitleContainer}
      {...props}
    />
  )
}
