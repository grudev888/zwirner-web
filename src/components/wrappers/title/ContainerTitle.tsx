import {
  ColumnProps,
  DzMoleculeLinkCTA,
  DzMoleculeTitleCTA,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_SIZES,
  TITLE_TYPES,
  TitleType,
} from '@zwirner/design-system'
import {FC, ReactNode} from 'react'

import styles from './titles.module.css'

interface ContainerTitleProps {
  type?: DzTitleMoleculeTypes
  titleType?: TitleType
  title: string
  subtitle?: string
  subtitleType?: TitleType
  subtitleSize?: string
  category?: string
  description?: string | ReactNode
  titleSize?: string
  linkCTA?: DzMoleculeLinkCTA
  primaryCTA?: DzMoleculeTitleCTA
  fullLeftContainer?: boolean
  customCTAContainerProps?: ColumnProps
  isWide?: boolean
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
  subtitleType = TITLE_TYPES.H2,
  subtitleSize = TITLE_TYPES.H2,
  subtitle,
  fullLeftContainer = false,
  description,
  category,
  linkCTA,
  primaryCTA,
  customCTAContainerProps,
  isWide = false,
}) => {
  return (
    <DzTitleMolecule
      type={type}
      data={{
        title,
        subtitle,
        customClass: stylesPerType[type],
        titleProps: {
          titleType: titleType,
          titleSize,
          subtitleType,
          subtitleSize,
        },
        category,
        description,
        linkCTA,
        primaryCTA,
        fullLeftContainer,
        customCTAContainerProps,
        isWide,
      }}
    />
  )
}
