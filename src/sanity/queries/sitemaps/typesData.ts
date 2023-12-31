import {z} from 'zod'

export const SitemapResSchema = z.array(
  z.object({
    params: z.object({
      slug: z.string(),
      lastmod: z.string(),
    }),
  })
)

export type SitemapResSchemaType = z.infer<typeof SitemapResSchema>
