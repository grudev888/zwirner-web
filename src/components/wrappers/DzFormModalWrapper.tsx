// eslint-disable-next-line no-restricted-imports
import {DzFormModal as DzFormModalBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzFormModalBasic>, 'LinkElement'>

export const DzFormModal = (props: Props) => {
  return <DzFormModalBasic {...props} LinkElement={Link} />
}
