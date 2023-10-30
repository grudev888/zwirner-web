// eslint-disable-next-line no-restricted-imports
import {DzTitleMolecule as DzTitleMoleculeBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzTitleMoleculeBasic>, 'LinkElement'>

export const DzTitleMolecule = (props: Props) => {
  return <DzTitleMoleculeBasic {...props} LinkElement={Link} />
}
