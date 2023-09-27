import {z} from 'zod'

const CtaActionSchema = z.enum([
  'inquire',
  'ecomm',
  'custom',
  'none',
  'Newsletter',
  'Link',
  'Download PDF',
  'Link Content',
])

// TODO: define type instead any
export const CTAsSchema = z.object({
  text: z.nullable(z.string()),
  action: z.nullable(CtaActionSchema),
  file: z.nullable(z.any()),
  link: z.nullable(
    z.object({
      href: z.nullable(z.any()),
      blank: z.nullable(z.boolean()),
    })
  ),
})

export const SanityImageSchema = z.object({
  asset: z.object({
    _ref: z.string(),
    _type: z.literal('reference'),
  }),
  _type: z.literal('image'),
})

export const SanitySlugSchema = z.object({
  current: z.string(),
})
