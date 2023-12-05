// eslint-disable-next-line no-restricted-imports
import {DzPromoModal as DzPromoModalBasic} from '@zwirner/design-system'
import Image from 'next/image'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzPromoModalBasic>, 'LinkElement' | 'ImgElement'>

export const DzPromoModal = (props: Props) => {
  return <DzPromoModalBasic {...props} LinkElement={Link} ImgElement={Image} />
}
