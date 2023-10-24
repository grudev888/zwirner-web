// eslint-disable-next-line no-restricted-imports
import {DzLink as DzLinkBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzLinkBasic>, 'LinkElement'>

export const DzLink = (props: Props) => {
  return <DzLinkBasic {...props} LinkElement={Link} />
}
