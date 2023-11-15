import {
  ColumnProps,
  DzMoleculeLinkCTA,
  DzMoleculeTitleCTA,
  DzTitleMoleculeTypes,
  TITLE_SIZES,
  TITLE_TYPES,
  TitleType,
} from '@zwirner/design-system'
import cn from 'classnames'
import {ReactNode} from 'react'

import {DzTitleMolecule} from '../DzTitleMoleculeWrapper'
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
  customTitleClass?: string
}

const stylesPerType: any = {
  [DzTitleMoleculeTypes.PAGE]: styles.pageTitleContainer,
  [DzTitleMoleculeTypes.MOLECULE]: styles.moleculeTitleContainer,
}

export const ContainerTitle = ({
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
  customTitleClass = '',
}: ContainerTitleProps) => {
  return (
    <DzTitleMolecule
      type={type}
      data={{
        title,
        subtitle,
        customClass: cn(stylesPerType[type], customTitleClass),
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
