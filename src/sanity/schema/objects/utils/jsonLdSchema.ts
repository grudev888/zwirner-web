import {defineArrayMember, defineField, defineType} from 'sanity'

import articleType from '@/sanity/schema/documents/article'
import BreadcrumbItemType, {BreadcrumbItemSchema} from '@/sanity/schema/objects/utils/breadcrumbItem'

export const SCHEMA_TYPE_JSON_LD = {
  ARTICLE: 'article',
  BREADCRUMB: 'breadcrumb',
  BLOG: 'blog',
  SITELINKS: 'sitelinks',
  MANUAL: 'manual',
}
export const JSON_LD_SCHEMA_TYPE_NAMES = [
  SCHEMA_TYPE_JSON_LD.ARTICLE,
  SCHEMA_TYPE_JSON_LD.BREADCRUMB,
  SCHEMA_TYPE_JSON_LD.BLOG,
  SCHEMA_TYPE_JSON_LD.SITELINKS,
  SCHEMA_TYPE_JSON_LD.MANUAL,
] as const

type SchemaType = (typeof JSON_LD_SCHEMA_TYPE_NAMES)[number]

interface SearchActionType {
  target: string;
}

export interface JSONLDSchema {
  schemaType: SchemaType
  article?: any
  breadcrumbs?: BreadcrumbItemSchema[]
  searchPotentialActions?: SearchActionType[]
  manualSchema?: any
}

export default defineType({
  name: 'jsonLD',
  type: 'object',
  title: 'Json+LD Schema',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      title: 'Schema Type',
      name: 'schemaType',
      type: 'string',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Breadcrumb', value: 'breadcrumb'},
          {title: 'Blog', value: 'blog'},
          {title: 'Sitelinks Seach Box', value: 'sitelinks'},
          {title: 'Manual Schema', value: 'manual'},
        ],
      },
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      description: `Adding Article structured data to your news, blog, and sports article pages can help Google understand more about the web page and show better title text, images, and date information for the article in search results on Google Search and other properties.`,
      to: [{type: articleType.name}],
      hidden: ({parent}) => {
        return !['article', 'blog'].includes(parent?.schemaType)
      },
    }),
    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      description: `A breadcrumb trail on a page indicates the page's position in the site hierarchy, and it may help users understand and explore a site effectively. A user can navigate all the way up in the site hierarchy, one level at a time, by starting from the last breadcrumb in the breadcrumb trail.`,
      type: 'array',
      of: [
        defineArrayMember({
          type: BreadcrumbItemType.name,
          title: 'Item',
        }),
      ],
      hidden: ({parent}) => {
        return !['breadcrumb'].includes(parent?.schemaType)
      },
    }),
    defineField({
      name: 'searchPotentialActions',
      title: 'Search Potential Actions',
      description:
        'A sitelinks search box is a quick way for people to search your site or app immediately on the search results page. The search box implements real-time suggestions and other features.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Target',
          name: 'potentialAction',
          fields: [{type: 'string', name: 'target'}],
        },
      ],
      options: {
        list: [{_type: 'potentialAction', target: 'https://www.davidzwirner.com/search?term'}],
      },
      hidden: ({parent}) => {
        return !['sitelinks'].includes(parent?.schemaType)
      },
    }),
    defineField({
      name: 'manualSchema',
      title: 'Manual Schema',
      type: 'text',
      hidden: ({parent}) => {
        return !['manual'].includes(parent?.schemaType)
      },
    }),
  ],
})
