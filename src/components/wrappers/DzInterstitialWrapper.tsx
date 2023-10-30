// eslint-disable-next-line no-restricted-imports
import {DzInterstitial as DzInterstitialBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzInterstitialBasic>, 'LinkElement'>

export const DzInterstitial = (props: Props) => {
  return <DzInterstitialBasic {...props} LinkElement={Link} />
}
