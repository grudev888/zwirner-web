import {groq} from 'next-sanity'

export const headerData = groq`
*[_type == 'navigation'] {
  Menu {
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
