import {DzColumn, DzLink, TEXT_LINK_SIZES} from '@zwirner/design-system'
import {ReactNode} from 'react'

import BackArrowIcon from '@/components/containers/layout/pages/backArrowIcon'

import styles from './artistsPageLayout.module.css'

interface ArtistsPageLayoutProps {
  children: ReactNode
  parentPath: string
  parentPageName: string
}

export default function ArtistsPageLayout({
  children,
  parentPath,
  parentPageName,
}: ArtistsPageLayoutProps) {
  return (
    <>
      <DzColumn span={12} className={styles.backNavContainer}>
        <BackArrowIcon style={{display: 'inline-block', marginRight: '1rem'}} />
        <DzLink href={parentPath} textLinkSize={TEXT_LINK_SIZES.SM}>
          Back to {parentPageName}
        </DzLink>
      </DzColumn>
      {children}
    </>
  )
}
