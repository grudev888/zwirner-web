// eslint-disable-next-line no-restricted-imports
import {DzSectionMenu as DzSectionMenuBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzSectionMenuBasic>, 'LinkElement'>

export const DzSectionMenu = (props: Props) => {
  return <DzSectionMenuBasic {...props} LinkElement={Link} />
}
