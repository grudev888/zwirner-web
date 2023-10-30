// eslint-disable-next-line no-restricted-imports
import {DzTitleExhibition as DzTitleExhibitionBasic} from '@zwirner/design-system'
import Link from 'next/link'

type Props = Omit<React.ComponentProps<typeof DzTitleExhibitionBasic>, 'LinkElement'>

export const DzTitleExhibition = (props: Props) => {
  return <DzTitleExhibitionBasic {...props} LinkElement={Link} />
}
