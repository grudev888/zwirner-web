import '../global.css'
import '@zwirner/design-system/dist/tailwind.css'

import {NextPage} from 'next'
import App, {AppContext, AppInitialProps, AppProps} from 'next/app'
import {ReCaptchaProvider} from 'next-recaptcha-v3'
import {ReactElement, ReactNode} from 'react'

import {APIProvider} from '@/common/api'
import DefaultLayout from '@/common/components/Layout'
import {SEOComponent} from '@/common/components/seo/seo'
import {mono, sans, serif} from '@/common/styles/fonts'
import {getGeneralSettings} from '@/sanity/services/settings.service'
import {GlobalSEOScheme} from '@/sanity/types'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppGeneralProps = {globalSEO?: GlobalSEOScheme}

type WrapperProps = AppGeneralProps & {
  Component: NextPageWithLayout
  pageProps: any
}

const Wrapper = ({Component, pageProps, globalSEO}: WrapperProps) => {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <APIProvider>
        <SEOComponent isDefault data={globalSEO} />
        {getLayout(<Component {...pageProps} />)}
      </APIProvider>
    </ReCaptchaProvider>
  )
}

function DzApp({Component, pageProps, globalSEO}: AppProps & WrapperProps) {
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

      <Wrapper Component={Component} pageProps={pageProps} globalSEO={globalSEO} />
    </>
  )
}

DzApp.getInitialProps = async (context: AppContext): Promise<AppGeneralProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  try {
    const generalSettings = await getGeneralSettings()
    const {globalSEO} = generalSettings ?? {}
    const [SEOSettings = {}] = globalSEO ?? []

    return {...ctx, globalSEO: SEOSettings}
  } catch (e: any) {
    console.error(
      'ERROR FETCHING GENERAL DATA:',
      `Status: ${e?.statusCode} `,
      e?.details?.description
    )
    return {...ctx}
  }
}

export default DzApp
