import {DzGridColumns} from '@zwirner/design-system'
import {ReactNode} from 'react'

import styles from './layout.module.css';

const Layout = ({children}: {children: ReactNode}) => (
  <>
    <header>
      <nav aria-label="primary"></nav>
    </header>
    <main className={styles.mainLayout}>
      <DzGridColumns className="h-full w-full">{children}</DzGridColumns>
    </main>
    <footer></footer>
  </>
)

export default Layout
