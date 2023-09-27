import {client} from '@/sanity/client'
import {generalSettings, GeneralSettingsSchema} from '@/sanity/queries/settings.queries'

// TODO: add validation error handling
export async function getGeneralSettings() {
  const data = await client.fetch(generalSettings)
  const validatedData = GeneralSettingsSchema.parse(data)
  return validatedData
}
