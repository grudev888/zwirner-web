// eslint-disable-next-line no-restricted-imports
import {DzEditorial as DzEditorialBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzEditorialBasic>, 'LinkElement'>

export const DzEditorial = (props: Props) => {
  return <DzEditorialBasic {...props} LinkElement={Link} />
}
