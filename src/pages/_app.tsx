import '../global.css'
import '@zwirner/design-system/dist/tailwind.css'

import {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {ReCaptchaProvider} from 'next-recaptcha-v3'
import {DefaultSeo} from 'next-seo'
import SEO from 'next-seo.config'
import {ReactElement, ReactNode} from 'react'

import {APIProvider} from '@/common/api'
import DefaultLayout from '@/common/components/Layout'
import {mono, sans, serif} from '@/common/styles/fonts'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Wrapper = ({Component, pageProps}: {Component: NextPageWithLayout; pageProps: any}) => {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <APIProvider>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </APIProvider>
    </ReCaptchaProvider>
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
