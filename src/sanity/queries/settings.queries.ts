import {groq} from 'next-sanity'
import {z} from 'zod'

import {redirects, RedirectSchema} from './components/redirects'
import {generalSEO, GeneralSEOSchema} from './components/seo/generalSEO'

export const generalSettings = groq`{
  'globalSEO': ${generalSEO},
  'redirects': ${redirects}
}
`

export const GeneralSettingsSchema = z.object({
  globalSEO: z.array(GeneralSEOSchema),
  redirects: z.array(RedirectSchema),
})
