import {parseCookieName} from './parseCookieName'
import {parseCookieValue} from './parseCookieValue'

export const getCookie = (name: string) => {
  const parsedName = parseCookieName(name)
  const decodedCookie = decodeURIComponent(document.cookie)
  const cookieArray = decodedCookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]?.trim() ?? ''

    if (cookie.indexOf(parsedName + '=') === 0) {
      const value = cookie.substring(parsedName.length + 1, cookie.length)
      return parseCookieValue(value)
    }
  }

  return null
}
