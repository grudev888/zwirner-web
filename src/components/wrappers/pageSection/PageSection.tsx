import {DzTitleMolecule, DzTitleMoleculeTypes} from '@zwirner/design-system'
import {FC, PropsWithChildren} from 'react'

interface PageSectionProps {
  title: string
  elementId: string
}

export const PageSection: FC<PageSectionProps & PropsWithChildren> = ({
  children,
  elementId,
  title,
}) => {
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
