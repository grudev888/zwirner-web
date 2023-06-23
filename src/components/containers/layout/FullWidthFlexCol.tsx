import {FC, PropsWithChildren} from 'react'
import cn from 'classnames'

import styles from './fullWidthFlexCol.module.css'

interface FullWidthFlexColProps {
  /** optional style overrides; css specificity requires prefixing with element type, e.g.
   *  div.noGapContainer { gap: 0 } */
  className?: string
}

export const FullWidthFlexCol: FC<FullWidthFlexColProps & PropsWithChildren> = ({
  children,
  className,
}) => {
  return <div className={cn(styles.fullWidthFlexCol, className)}>{children}</div>
}
