// eslint-disable-next-line no-restricted-imports
import {DzPortableText as DzPortableTextBasic} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzPortableTextBasic>, 'ImgElement' | 'LinkElement'>

export const DzPortableText = (props: Props) => {
  return <DzPortableTextBasic {...props} LinkElement={Link} ImgElement={Image} />
}
