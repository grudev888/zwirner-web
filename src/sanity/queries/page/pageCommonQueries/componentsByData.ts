import {groq} from 'next-sanity'
import {z} from 'zod'

import {
  pageBuilderComponentsData,
  PageBuilderComponentsDataSchema,
} from './pageBuilderComponentsData'

export const componentsByData = groq`
  components[] {
    ${pageBuilderComponentsData}
  },
`

export const ComponentsByDataScheme = z.array(PageBuilderComponentsDataSchema)
