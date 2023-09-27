import {client} from '@/sanity/client'
import {
  installationViewsBySlug,
  InstallationViewsBySlugPropsSchema,
  InstallationViewsBySlugPropsType,
  InstallationViewsBySlugSchema,
} from '@/sanity/queries/exhibitions/installationViewsBySlug'

export async function getExhibitionInstallationViews(params: InstallationViewsBySlugPropsType) {
  const validatedParams = InstallationViewsBySlugPropsSchema.parse(params)
  const data = await client.fetch(installationViewsBySlug, validatedParams)
  if (!data) return null
  const validatedData = InstallationViewsBySlugSchema.parse(data)
  return validatedData
}
