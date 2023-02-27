import {ReactNode} from 'react'

const Layout = ({children}: {children: ReactNode}) => (
  <>
    <header>
      <nav aria-label="primary"></nav>
    </header>
    <main>{children}</main>
    <footer></footer>
  </>
)

export default Layout
