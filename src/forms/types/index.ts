export interface IFormInput {
  formId: string
  email: string
  interests: string[]
  firstName: string
  lastName: string
  terms: boolean
  currentUrl: string
}

export interface ILocation {
  ip: string
  timezone: string
  latitude: string
  longitude: string
  country: string
  region: string
  city: string
}
