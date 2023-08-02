import {
  DzMoleculeLinkCTA,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_SIZES,
  TITLE_TYPES,
  TitleType,
} from '@zwirner/design-system'
import {FC} from 'react'

import styles from './titles.module.css'

interface ContainerTitleProps {
  type?: DzTitleMoleculeTypes
  titleType?: TitleType
  title: string
  titleSize?: string
  linkCTA?: DzMoleculeLinkCTA
}

const stylesPerType: any = {
  [DzTitleMoleculeTypes.PAGE]: styles.pageTitleContainer,
  [DzTitleMoleculeTypes.MOLECULE]: styles.moleculeTitleContainer,
}

export const ContainerTitle: FC<ContainerTitleProps> = ({
  type = DzTitleMoleculeTypes.PAGE,
  title,
  titleType = TITLE_TYPES.H1,
  titleSize = TITLE_SIZES.MD,
  linkCTA,
}) => {
  return (
    <DzTitleMolecule
      type={type}
      data={{
        title,
        customClass: stylesPerType[type],
        titleProps: {
          titleType: titleType,
          titleSize,
        },
        linkCTA,
      }}
    />
  )
}
