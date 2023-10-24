import {ALL_YEARS_ID, YearWrapperComponent} from '@zwirner/design-system'

import {DzLink} from '@/components/wrappers/DzLinkWrapper'

export const YearLink: YearWrapperComponent = ({children, year, isDisabled}) => {
  const href =
    year === ALL_YEARS_ID
      ? '/exhibitions/past-exhibitions'
      : `/exhibitions/past-exhibitions/year/${year}`

  return isDisabled ? <>{children}</> : <DzLink href={href}>{children}</DzLink>
}
