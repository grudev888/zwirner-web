export const parseCookieValue = (value: string) => {
  try {
    return JSON.parse(decodeURIComponent(value))
  } catch (error) {
    return decodeURIComponent(value)
  }
}
