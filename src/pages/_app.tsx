import '../styles/globals.css'
import '@zwirner/design-system/dist/tailwind.css'

import {DzColumn} from '@zwirner/design-system'
import {NextPage} from 'next'
import App, {AppContext, AppInitialProps, AppProps} from 'next/app'
import {ReCaptchaProvider} from 'next-recaptcha-v3'
import {ReactElement, ReactNode} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {APIProvider} from '@/common/api'
import DefaultLayout from '@/common/components/layout/Layout'
import {SEOComponent} from '@/common/components/seo/seo'
import {mono, sans, serif} from '@/common/styles/fonts'
import {getFooterData, getHeaderData} from '@/sanity/services/layout.service'
import {getGeneralSettings} from '@/sanity/services/settings.service'
import {GlobalSEOScheme} from '@/sanity/types'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type LayoutData = {
  headerData: any
  footerData: any
}

type AppGeneralProps = {globalSEO?: GlobalSEOScheme; layoutData?: LayoutData}

type WrapperProps = AppGeneralProps & {
  Component: NextPageWithLayout
  pageProps: any
}

const Wrapper = ({Component, pageProps, globalSEO, layoutData}: WrapperProps) => {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout layoutData={layoutData}>{page}</DefaultLayout>)
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <APIProvider>
        <SEOComponent isDefault data={globalSEO} />
        <ErrorBoundary
          fallback={
            <DzColumn className="mb-12 h-full" span={12}>
              <div className="flex justify-center p-5">Something went wrong</div>
            </DzColumn>
          }
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </APIProvider>
    </ReCaptchaProvider>
  )
}

function DzApp({Component, pageProps, globalSEO, layoutData}: AppProps & WrapperProps) {
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

      <Wrapper
        Component={Component}
        pageProps={pageProps}
        globalSEO={globalSEO}
        layoutData={layoutData}
      />
    </>
  )
}

DzApp.getInitialProps = async (context: AppContext): Promise<AppGeneralProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  const generalSettings = await getGeneralSettings()
  const {globalSEO} = generalSettings ?? {}
  const [SEOSettings = {}] = globalSEO ?? []

  const headerDataFetched = await getHeaderData()
  const [headerData] = headerDataFetched ?? []
  const footerDataFetched = await getFooterData()
  const [footerData] = footerDataFetched ?? []

  return {
    ...ctx,
    globalSEO: SEOSettings,
    layoutData: {
      headerData,
      footerData,
    },
  }
}

export default DzApp
