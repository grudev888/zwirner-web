const emptyHeaderItems = {items: []}
const emptySocialMedia = {
  weChat: '',
  instagram: '',
  twitter: '',
  facebook: '',
}
const defaultFooterCopies = {
  copies: {
    rights: `David Zwirner - All rights reserved ${new Date().getFullYear()}`,
  },
}

export const getHeaderProps = (data: any) => {
  const {headerData = {}} = data ?? {}
  const {footerData = {}} = data ?? {}
  const {socialMedia} = footerData ?? {}

  const {Menu, MenuMobile} = headerData ?? {}

  return {
    menu: {desktop: Menu ?? emptyHeaderItems, mobile: MenuMobile ?? emptyHeaderItems},
    socialMedia: socialMedia ?? emptySocialMedia,
  }
}
export const getFooterProps = (data: any) => {
  const {footerData = {}} = data ?? {}
  const {links, socialMedia} = footerData ?? {}
  return {
    data: {
      links: links ?? [],
      socialMedia: socialMedia ?? emptySocialMedia,
      ...defaultFooterCopies,
    },
  }
}
