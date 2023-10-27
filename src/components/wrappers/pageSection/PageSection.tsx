import {DzTitleMolecule, DzTitleMoleculeTypes} from '@zwirner/design-system'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

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
        LinkElement={Link}
      />
      {children}
    </section>
  )
}

export default PageSection
