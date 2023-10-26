// eslint-disable-next-line no-restricted-imports
import {DzMedia as DzMediaBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzMediaBasic>, 'LinkElement'>

export const DzMedia = (props: Props) => {
  return <DzMediaBasic {...props} LinkElement={Link} />
}
