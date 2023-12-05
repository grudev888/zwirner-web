import {DzFooter, DzGridColumns, DzHeader} from '@zwirner/design-system'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
import useSWRImmutable from 'swr/immutable'

import CtaModalListener from '@/components/containers/ctaModalListener/ctaModalListener'
import LinkClickListener from '@/components/containers/LinkClickListener/LinkClickListener'
import {useTimeDelayedRoutePopup} from '@/components/hooks/useTimeDelayedRoutePopup'
import {allCampaigns} from '@/sanity/queries/popups/allCampaigns'
import {getAllCampaigns, getPopupPerPage} from '@/sanity/services/popups/getAllCampaigns'

import styles from './layout.module.css'
import {getFooterProps, getHeaderProps} from './mappers'
import {openNewsletterFooter, openNewsletterHeader, openPopupCb} from './utils'

type LayoutProps = {
  children: ReactNode
  pageType: string | undefined
  layoutData?: any
}

const Layout = ({children, layoutData, pageType}: LayoutProps) => {
  const {menu} = getHeaderProps(layoutData)
  const {data} = getFooterProps(layoutData)
  const router = useRouter()
  const {data: popupsPerPages} = useSWRImmutable(allCampaigns, (query) => getAllCampaigns(query))
  const popupForPage = getPopupPerPage({url: router.asPath, pageType, popupsPerPages})
  useTimeDelayedRoutePopup(() => openPopupCb(popupForPage), popupForPage?.triggers.triggerTime)

  return (
    <>
      <DzHeader
        menu={menu}
        footerData={data}
        headerClass={styles.header}
        linkProps={{
          router,
          useRoute: true,
        }}
        LinkElement={Link}
        newsletterAction={openNewsletterHeader}
      />
      <CtaModalListener />
      <main className={styles.mainLayout} aria-label="Main" role="main">
        <DzGridColumns className="h-full min-h-screen w-full">{children}</DzGridColumns>
      </main>
      <LinkClickListener />
      <DzFooter
        footerClass={styles.footer}
        data={data}
        newsletterAction={openNewsletterFooter}
        LinkElement={Link}
      />
    </>
  )
}

export default Layout
