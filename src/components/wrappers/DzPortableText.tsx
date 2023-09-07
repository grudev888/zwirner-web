// eslint-disable-next-line no-restricted-imports
import {DzPortableText as DzPortableTextBasic} from '@zwirner/design-system'
import Image from 'next/image'

type Props = React.ComponentProps<typeof DzPortableTextBasic> & {ImgElement: typeof Image}

export const DzPortableText = (props: Props) => {
  return <DzPortableTextBasic {...props} />
}
