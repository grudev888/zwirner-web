import {DzTitleMolecule, DzTitleMoleculeTypes, TITLE_TYPES} from '@zwirner/design-system'
import {FC} from 'react'

import styles from './titles.module.css'

interface ContainerTitleProps {
  title: string
  titleSize?: string
}

export const ContainerTitle: FC<ContainerTitleProps> = ({title, titleSize}) => {
  return (
    <DzTitleMolecule
      type={DzTitleMoleculeTypes.PAGE}
      data={{
        title,
        customClass: styles.pageTitleContainer,
        titleProps: {
          titleType: TITLE_TYPES.H1,
          titleSize,
        },
      }}
    />
  )
}
