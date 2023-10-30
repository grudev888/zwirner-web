// eslint-disable-next-line no-restricted-imports
import {DzComplexGrid as DzComplexGridBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzComplexGridBasic>, 'LinkElement'>

export const DzComplexGrid = (props: Props) => {
  return <DzComplexGridBasic {...props} LinkElement={Link} />
}
