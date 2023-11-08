import '../styles/globals.css'
import '@zwirner/design-system/dist/tailwind.css'

import {DzColumn} from '@zwirner/design-system'
import {NextPage} from 'next'
import App, {AppContext, AppInitialProps, AppProps} from 'next/app'
import {useRouter} from 'next/router'
import Script from 'next/script'
import {ReactElement, ReactNode} from 'react'
import {useEffect} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {APIProvider} from '@/common/api'
import DefaultLayout from '@/common/components/layout/Layout'
import {SEOComponent} from '@/common/components/seo/seo'
import {GTMPageLoadStartedText, GTMScript} from '@/common/constants/gtmConstants'
import {mono, sans, serif} from '@/common/styles/fonts'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'
import {gtmPageLoadGetArtists} from '@/common/utils/gtm/gtmPageLoadGetArtists'
import {getFooterData, getHeaderData} from '@/sanity/services/layout.service'
import {getGeneralSettings} from '@/sanity/services/settings.service'
import {GlobalSEOScheme} from '@/sanity/types'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export interface SharedPageProps {
  data: any
  slug: string | null
  draftMode: boolean
  token: string
  draftViewToken: string
  queryParams: {
    [key: string]: string
  }
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
    <>
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
    </>
  )
}

function DzApp({Component, pageProps, globalSEO, layoutData}: AppProps & WrapperProps) {
  const router = useRouter()
  useEffect(() => {
    const gtmData = pageProps.dataLayerProps
    const pageLoadStarted = () => {
      if (gtmData) {
        if (pageProps.data?.artistPages)
          gtmData.page_data.artist = gtmPageLoadGetArtists(pageProps.data.artistPages)
        gtmData.location = document.location.href
        gtmData.page_data.page_hostname = document.location.hostname
        gtmData.page_data.page_path = document.location.pathname
        gtmData.page_data.page_query_string = document.location.search
        gtmData.page_data.page_query_hash = document.location.hash
        gtmData.page_data.language = document.documentElement.lang
        gtmData.page_data.page_title = document.title
        return gtmEvent(GTMPageLoadStartedText.event, gtmData)
      }
    }
    pageLoadStarted()
  }, [pageProps])

  useEffect(() => {
    const handleRouteChange = () => {
      window.dataLayer = []
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])
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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {GTMScript}
      </Script>
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
  const SEOSettings = generalSettings.globalSEO.at(0)

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
