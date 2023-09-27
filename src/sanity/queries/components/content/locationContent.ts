import {groq} from 'next-sanity'
import {z} from 'zod'

export const locationContent = groq`
  _type == 'location' => {
    ...
  },
`
const LocationTimezoneSchema = z.enum([
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Hong_Kong',
])
const LocationTypeSchema = z.enum(['gallery', 'dz-gallery', 'museum'])

// TODO: define type instead any
export const LocationContentSchema = z.object({
  name: z.string(),
  address: z.any(),
  timezone: LocationTimezoneSchema,
  hours: z.nullable(z.any()),
  phone: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  url: z.nullable(z.string()),
  type: LocationTypeSchema,
  photos: z.nullable(z.array(z.any())),
})
