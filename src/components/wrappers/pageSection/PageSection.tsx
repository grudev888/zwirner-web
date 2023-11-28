import {DzTitleMoleculeTypes} from '@zwirner/design-system'
import DzSection from '@zwirner/design-system/src/atoms/DzSection'
import {PropsWithChildren} from 'react'

import {DzTitleMolecule} from '../DzTitleMoleculeWrapper'

type PageSectionProps = {
  title: string
  elementId: string
} & PropsWithChildren

export const PageSection = ({children, elementId, title}: PageSectionProps) => {
  return (
    <DzSection id={elementId}>
      <DzTitleMolecule
        data={{
          title,
          customClass: 'mb-[2.5rem]',
        }}
        type={DzTitleMoleculeTypes.SECTION}
      />
      {children}
    </DzSection>
  )
}

export default PageSection
