import {z} from 'zod'

export const CurrencySchema = z.enum(['EUR', 'USD', 'GBP', 'HKD'])
export const FramedSchema = z.enum(['Framed', 'Unframed', 'NotApplicable'])
export const ArtworkTypeSchema = z.enum([
  'drawing',
  'mixedMedia',
  'painting',
  'photography',
  'print',
  'sculpture',
  'other',
])
