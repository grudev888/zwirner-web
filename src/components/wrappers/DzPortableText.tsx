// eslint-disable-next-line no-restricted-imports
import {DzPortableText as DzPortableTextBasic} from '@zwirner/design-system'
import Image from 'next/image'

type Props = {
  portableProps: React.ComponentProps<typeof DzPortableTextBasic>['portableProps']
  customStyles?: React.ComponentProps<typeof DzPortableTextBasic>['customStyles']
  builder: React.ComponentProps<typeof DzPortableTextBasic>['builder']
  ImgElement: typeof Image
}

export const DzPortableText = (props: Props) => {
  return <DzPortableTextBasic {...props} />
}
