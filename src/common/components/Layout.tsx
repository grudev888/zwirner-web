import {DzColumn, DzGridColumns} from '@zwirner/design-system'
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
        {Array.from(Array(11)).map((_, i) => (
          <DzColumn
            className="z-0 h-screen border border-black-20 bg-black-10"
            key={i}
            span={[1]}
          />
        ))}
      </DzGridColumns>
    </main>
    <footer></footer>
  </>
)

export default Layout
