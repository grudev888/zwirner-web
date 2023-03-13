import {DzGridColumns} from '@zwirner/design-system'
import {ReactNode} from 'react'

const Layout = ({children}: {children: ReactNode}) => (
  <>
    <header>
      <nav aria-label="primary"></nav>
    </header>
    <main className="w-screen">
      <DzGridColumns className="h-full w-full">{children}</DzGridColumns>
    </main>
    <footer></footer>
  </>
)

export default Layout
