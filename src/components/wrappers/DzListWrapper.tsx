// eslint-disable-next-line no-restricted-imports
import {DzList as DzListBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzListBasic>, 'LinkElement'>

export const DzList = (props: Props) => {
  return <DzListBasic {...props} LinkElement={Link} />
}
