// eslint-disable-next-line no-restricted-imports
import {DzHero as DzHeroBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzHeroBasic>, 'LinkElement'>

export const DzHero = (props: Props) => {
  return <DzHeroBasic {...props} LinkElement={Link} />
}
