// eslint-disable-next-line no-restricted-imports
import {DzTabsCards as DzTabsCardsBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzTabsCardsBasic>, 'LinkElement'>

export const DzTabsCards = (props: Props) => {
  return <DzTabsCardsBasic {...props} LinkElement={Link} />
}
