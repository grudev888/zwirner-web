import {DzFooter, DzGridColumns, DzHeader} from '@zwirner/design-system'
import {ReactNode} from 'react'

import styles from './layout.module.css'
import {getFooterProps, getHeaderProps} from './mappers'

interface LayoutProps {
  children: ReactNode
  layoutData?: any
}
const Layout = ({children, layoutData}: LayoutProps) => {
  const {menu, socialMedia} = getHeaderProps(layoutData)
  const {data} = getFooterProps(layoutData)

  return (
    <>
      <DzHeader
        menu={menu}
        socialMedia={socialMedia}
        // TODO handle search
        handleSearch={() => null}
        headerClass={styles.header}
      />
      <main className={styles.mainLayout}>
        <DzGridColumns className="h-full min-h-screen w-full">{children}</DzGridColumns>
      </main>
      <DzFooter
        footerClass={styles.footer}
        data={data}
        // TODO handle newsletter
        newsletterAction={() => null}
      />
    </>
  )
}

export default Layout
