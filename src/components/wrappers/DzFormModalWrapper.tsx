// eslint-disable-next-line no-restricted-imports
import {DzFormModal as DzFormModalBasic} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzFormModalBasic>, 'LinkElement' | 'ImgElement'>

export const DzFormModal = (props: Props) => {
  return <DzFormModalBasic {...props} LinkElement={Link} ImgElement={Image} />
}
