// eslint-disable-next-line no-restricted-imports
import {DzCard as DzCardBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzCardBasic>, 'LinkElement'>

export const DzCard = (props: Props) => {
  return <DzCardBasic {...props} LinkElement={Link} />
}
