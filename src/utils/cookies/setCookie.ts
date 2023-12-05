import {CookieOptions, parseCookieName} from './parseCookieName'

export const setCookie = (
  name: string,
  value: any,
  options: CookieOptions = {},
  daysToExpire?: number
): void => {
  const parsedName = parseCookieName(name)
  const serializedValue = JSON.stringify(value)
  let cookieString = `${encodeURIComponent(parsedName)}=${encodeURIComponent(serializedValue)}`

  if (options.expires) {
    const expirationDate = options.expires

    if (!isNaN(expirationDate.getTime())) {
      cookieString += `; expires=${expirationDate.toUTCString()}`
    }
  } else if (daysToExpire) {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + daysToExpire)

    cookieString += `; expires=${expirationDate.toUTCString()}`
  }

  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  if (options.secure) {
    cookieString += '; secure'
  }

  if (options.httpOnly) {
    cookieString += '; HttpOnly'
  }

  document.cookie = cookieString
}
