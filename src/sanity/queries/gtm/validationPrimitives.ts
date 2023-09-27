// this is currently not in use, but will be part of the effort to
// consolidate types using zod as the source of truth.
// this is a universal schema that all gtm events will require

import {z} from 'zod'

export const GtmCommonDataSchema = z.object({
  event: z.string().min(1),
  detailed_event: z.string().min(1),
})

export type GtmCommonDataType = z.infer<typeof GtmCommonDataSchema>
