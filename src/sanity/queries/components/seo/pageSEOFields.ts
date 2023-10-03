import {groq} from 'next-sanity'
import {z} from 'zod'

import {SCHEMA_TYPE_JSON_LD} from '@/sanity/types'

import {SanitySlugSchema} from '../validationPrimitives'

// Must follow JSONLDSchema
const jsonLDFields = groq`
    schemaType,
    (schemaType == '${SCHEMA_TYPE_JSON_LD.ARTICLE}' || schemaType == '${SCHEMA_TYPE_JSON_LD.BLOG}') => {
      article-> {
        _updatedAt,
        _createdAt,
        author->,
        title,
        images,
        publisherName,
        description,
        publisherLogo
      }
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.BREADCRUMB}' => {
      breadcrumbs
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.SITELINKS}' => {
      searchPotentialActions
    },
    schemaType == '${SCHEMA_TYPE_JSON_LD.MANUAL}' => {
      manualSchema
    },
`

// Must follow PageSEOSchema
export const pageSEOFields = groq`
  pageTitle,
  metaDescription,
  h1Header,
  "canonicalURL": ^.slug,
  robotsNoIndex,
  robotsNoFollow,
  imageMeta,
  socialTitle,
  socialDescription,
  jsonLD {
    ${jsonLDFields}
  }
`

const JsonLDSchemaTypeSchema = z.enum(['article', 'breadcrumb', 'sitelinks', 'manual', 'blog'])

export const PageSEOFieldsSchema = z.object({
  pageTitle: z.string().min(5).max(70).nullish(),
  metaDescription: z.string().max(160).nullish(),
  h1Header: z.any(),
  robotsNoIndex: z.boolean(),
  robotsNoFollow: z.boolean(),
  imageMeta: z.any(),
  socialTitle: z.string().max(60).nullish(),
  socialDescription: z.any(),
  canonicalURL: SanitySlugSchema.nullish(),
  jsonLD: z.nullable(
    z.object({
      schemaType: z.nullable(JsonLDSchemaTypeSchema),
      article: z.nullable(z.any()),
      breadcrumbs: z.nullable(z.array(z.any())),
      searchPotentialActions: z.nullable(z.array(z.any())),
      manualSchema: z.nullable(z.any()),
    })
  ),
})

export type PageSEOFieldsType = z.infer<typeof PageSEOFieldsSchema>
