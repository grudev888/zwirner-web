import {DzTitleMoleculeTypes} from '@zwirner/design-system'
import {PropsWithChildren} from 'react'

import {DzTitleMolecule} from '../DzTitleMoleculeWrapper'

type PageSectionProps = {
  title: string
  elementId: string
} & PropsWithChildren

export const PageSection = ({children, elementId, title}: PageSectionProps) => {
  return (
    <section id={elementId}>
      <DzTitleMolecule
        data={{
          title,
          customClass: 'mb-[2.5rem]',
        }}
        type={DzTitleMoleculeTypes.SECTION}
      />
      {children}
    </section>
  )
}

export default PageSection
