import {DzFooter, DzGridColumns, DzHeader} from '@zwirner/design-system'
import {ReactNode} from 'react'

import styles from './layout.module.css'
import {getFooterProps, getHeaderProps} from './mappers'

export const footerData = {
  copies: {
    rights: 'David Zwirner - All rights reserved 2023',
  },
  links: [
    {
      _type: 'menuItemLink',
      newTab: true,
      mobileEnabled: true,
      desktopEnabled: true,
      link: 'https://www.davidzwirner.com/privacy-policy',
      title: 'Privacy Policy',
    },
    {
      _type: 'menuItemPage',
      desktopEnabled: true,
      mobileEnabled: true,
      newTab: true,
      anchor: 'Cool-id',
      title: 'Internal link',
      page: {
        url: 'sherrie-levine',
      },
    },
  ],
  socialMedia: {
    _type: 'social',
    weChat: 'https://www.davidzwirner.com/wechat',
    instagram: 'https://www.instagram.com/davidzwirner/',
    twitter: 'https://twitter.com/davidzwirner',
    facebook: 'https://www.facebook.com/davidzwirner',
  },
}
interface LayoutProps {
  children: ReactNode
  layoutData?: any
}
const Layout = ({children, layoutData}: LayoutProps) => {
  const {menu, socialMedia} = getHeaderProps(layoutData)
  const {data} = getFooterProps(layoutData)
  return (
    <>
      <DzHeader
        menu={menu}
        socialMedia={socialMedia}
        // TODO handle search
        handleSearch={() => null}
        headerClass={styles.header}
      />
      <main className={styles.mainLayout}>
        <DzGridColumns className="h-full min-h-screen w-full">{children}</DzGridColumns>
      </main>
      <DzFooter
        footerClass={styles.footer}
        data={data}
        // TODO handle newsletter
        newsletterAction={() => null}
      />
    </>
  )
}

export default Layout
