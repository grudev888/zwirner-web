import {groq} from 'next-sanity'

const headerMenu = groq`
  items[] {
    ...,
    _type == 'menuItemPage' => {
      page->{
        'url':slug.current
      }
    },
    _type == 'menuItemSubmenu' => {
      ...,
      submenu {
        _type,
        items[] {
          ...
        }
      }
    }
  }
`
export const headerData = groq`
*[_type == 'navigation'] {
  Menu {
   ${headerMenu}
  },
  MenuMobile {
   ${headerMenu}
  }
}`

export const footerData = groq`
*[_type == 'footer'] {
  ...,
  links[] {
    ...,
    _type=='menuItemPage' => {
      ...,
      page->{
        'url': slug.current
      }
    }
  }
}`
