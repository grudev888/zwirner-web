import {DocumentsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import article from './article'
import authorType from './author'
import locationType from './location'

export default defineType({
  name: 'press',
  title: 'Press',
  icon: DocumentsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Author',
          to: [{type: authorType.name}],
        },
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'publishDate',
      type: 'datetime',
      title: 'Publish Date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Press url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          relativeOnly: false,
          scheme: ['https', 'http', 'mailto'],
        }),
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{type: article.name}],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: locationType.name}],
    }),
    defineField({
      name: 'type',
      title: 'Press type',
      type: 'string',
      options: {
        list: [
          {title: 'Review', value: 'review'},
          {title: 'Article', value: 'article'},
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
    }),
  ],
})
