import '../global.css'
import '@zwirner/design-system/dist/tailwind.css'

import {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {DefaultSeo} from 'next-seo'
import SEO from 'next-seo.config'
import {ReactElement, ReactNode} from 'react'
import DefaultLayout from 'src/common/components/Layout'
import {mono, sans, serif} from 'src/common/styles/fonts'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Wrapper = ({Component, pageProps}: {Component: NextPageWithLayout; pageProps: any}) => {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <>
      <DefaultSeo {...SEO} />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: ${serif.style.fontFamily};
          }
        `}
      </style>

      <Wrapper Component={Component} pageProps={pageProps} />
    </>
  )
}
