import {DzGridColumns} from '@zwirner/design-system'
import {ReactNode} from 'react'

const Layout = ({children}: {children: ReactNode}) => (
  <>
    <header>
      <nav aria-label="primary"></nav>
    </header>
    <main>
      <DzGridColumns
        position="absolute"
        className="pointer-events-none absolute top-0 left-0 m-0 h-full w-full"
      >
        {children}
      </DzGridColumns>
    </main>
    <footer></footer>
  </>
)

export default Layout
