export type CookieOptions = {
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
}

export const parseCookieName = (name: string) => {
  return `_dz${name.replace(/\s/g, '_').replace(/_./g, (match) => match.charAt(1).toUpperCase())}`
}
