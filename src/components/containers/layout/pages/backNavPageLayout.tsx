import {DzColumn, DzLink, TEXT_LINK_SIZES} from '@zwirner/design-system'
import Link from 'next/link'
import {ReactNode} from 'react'

import BackArrowIcon from '@/components/containers/layout/pages/backArrowIcon'

import styles from './backNavPageLayout.module.css'

interface BackNavPageLayoutProps {
  children: ReactNode
  parentPath: string
  parentPageName: string
}

export default function BackNavPageLayout({
  children,
  parentPath,
  parentPageName,
}: BackNavPageLayoutProps) {
  return parentPath ? (
    <>
      <DzColumn span={12}>
        <div className={styles.backNavContainer}>
          <BackArrowIcon className={styles.backArrowIcon} />
          <DzLink
            className={styles.backLink}
            href={parentPath}
            LinkElement={Link}
            textLinkSize={TEXT_LINK_SIZES.SM}
          >
            Back to {parentPageName}
          </DzLink>
        </div>
      </DzColumn>
      {children}
    </>
  ) : null
}
