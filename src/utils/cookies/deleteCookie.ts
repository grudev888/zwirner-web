import {CookieOptions, parseCookieName} from './parseCookieName'
import {setCookie} from './setCookie'

export const deleteCookie = (name: string, options: CookieOptions = {}) => {
  const parsedName = parseCookieName(name)
  setCookie(parsedName, '', {expires: new Date(0), ...options})
}
