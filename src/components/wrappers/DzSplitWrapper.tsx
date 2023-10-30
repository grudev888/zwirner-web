// eslint-disable-next-line no-restricted-imports
import {DzSplit as DzSplitBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzSplitBasic>, 'LinkElement'>

export const DzSplit = (props: Props) => {
  return <DzSplitBasic {...props} LinkElement={Link} />
}
