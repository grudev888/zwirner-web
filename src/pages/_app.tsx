import '../styles/globals.css'
import '@zwirner/design-system/dist/tailwind.css'

import {CartProvider, ShopifyProvider} from '@shopify/hydrogen-react'
import {DzColumn} from '@zwirner/design-system'
import {NextPage} from 'next'
import App, {AppContext, AppInitialProps, AppProps} from 'next/app'
import {useRouter} from 'next/router'
import Script from 'next/script'
import {ReactElement, ReactNode} from 'react'
import {useEffect} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {ToastProvider} from 'react-toast-notifications'

import {APIProvider} from '@/common/api'
import DefaultLayout from '@/common/components/layout/Layout'
import {SEOComponent} from '@/common/components/seo/seo'
import DzToast from '@/common/components/toast/DzToast'
import {GTMPageLoadStartedText, GTMScript} from '@/common/constants/gtmConstants'
import {gtmEvent} from '@/common/utils/gtm/gtmEvent'
import {gtmPageLoadGetArtists} from '@/common/utils/gtm/gtmPageLoadGetArtists'
import {env} from '@/env.mjs'
import {getFooterData, getHeaderData} from '@/sanity/services/layout.service'
import {getGeneralSettings} from '@/sanity/services/settings.service'
import {GlobalSEOScheme} from '@/sanity/types'
import useCartStore from '@/store/cartStore'
import usePageStore from '@/store/pageStore'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export interface SharedPageProps {
  data: any
  slug: string | null
  draftMode: boolean
  token: string
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
  const pageType = pageProps?.data?._type
  const setCatPanelOpen = useCartStore((store) => store.setCatPanelOpen)
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <DefaultLayout pageType={pageType} layoutData={layoutData}>
        {page}
      </DefaultLayout>
    ))

  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={env.NEXT_PUBLIC_STORE_DOMAIN}
      storefrontToken={env.NEXT_PUBLIC_STOREFRONT_API_TOKEN}
      storefrontApiVersion={env.NEXT_PUBLIC_STOREFRONT_API_VERSION}
    >
      <CartProvider onLineAddComplete={setCatPanelOpen}>
        <APIProvider>
          <ToastProvider components={{Toast: DzToast}} autoDismissTimeout={8000} autoDismiss>
            <SEOComponent isDefault data={globalSEO} />
            <ErrorBoundary
              fallback={
                <DzColumn className="mb-12 h-full" span={12}>
                  <div className="flex justify-center p-5">Something went wrong</div>
                </DzColumn>
              }
            >
              {getLayout(<Component {...pageProps} />)}
              <div id="scroll-observer-target" />
            </ErrorBoundary>
          </ToastProvider>
        </APIProvider>
      </CartProvider>
    </ShopifyProvider>
  )
}

function DzApp({Component, pageProps, globalSEO, layoutData}: AppProps & WrapperProps) {
  const draftMode = pageProps.draftMode ?? false
  const router = useRouter()
  const setPageState = usePageStore((state) => state.setPageState)
  useEffect(() => {
    const gtmData = pageProps.dataLayerProps
    const pageLoadStarted = () => {
      if (gtmData) {
        setPageState({
          title: gtmData.page_data.page_title,
          hash: gtmData.page_data.page_hash,
          section: gtmData.page_data.site_section,
        })
        if (pageProps.data?.artistPages)
          gtmData.page_data.artist = gtmPageLoadGetArtists(pageProps.data.artistPages)
        gtmData.page_data.page_location = document.location.href
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
  }, [pageProps, setPageState])

  useEffect(() => {
    const handleRouteChange = () => {
      setPageState({title: '', hash: '', section: ''})
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events, setPageState])
  return (
    <>
      {!draftMode && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {GTMScript}
        </Script>
      )}
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
