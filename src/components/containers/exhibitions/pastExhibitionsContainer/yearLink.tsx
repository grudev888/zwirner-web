import {ALL_YEARS_ID, DzLink, YearWrapperComponent} from '@zwirner/design-system'
import Link from 'next/link'

export const YearLink: YearWrapperComponent = ({children, year, isDisabled}) => {
  const href =
    year === ALL_YEARS_ID
      ? '/exhibitions/past-exhibitions'
      : `/exhibitions/past-exhibitions/year/${year}`

  return isDisabled ? (
    <>{children}</>
  ) : (
    <DzLink href={href} LinkElement={Link}>
      {children}
    </DzLink>
  )
}
