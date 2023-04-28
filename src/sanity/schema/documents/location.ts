import {PinIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import addressType from '../objects/utils/address'

export default defineType({
  name: 'location',
  title: 'Location',
  icon: PinIcon,
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: addressType.name,
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Timezone',
      name: 'timezone',
      type: 'string',
      options: {
        list: [
          // IANA timezone values
          {title: 'New york, USA (UTC/GMT-4)', value: 'America/New_York'},
          {title: 'London, England (UTC/GMT+1)', value: 'Europe/London'},
          {title: 'Paris, France (UTC/GMT+2)', value: 'Europe/Paris'},
          {title: 'Hong Kong, SAR China (UTC/GMT+8)', value: 'Asia/Hong_Kong'},
        ],
      },
      initialValue: 'America/New_York',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Operating Hours',
      name: 'hours',
      type: 'availability',
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        ).error('Check the phone number format'),
      // todo create a custom field with country selection, masks and validation
      // https://www.sanity.io/docs/validation#4dc8b38bc411
    }),
    defineField({
      name: 'description',
      title: 'Description, body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Location url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          relativeOnly: false,
          scheme: ['https', 'http', 'mailto'],
        }),
    }),
    defineField({
      title: 'Location type',
      name: 'type',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          {title: 'Gallery', value: 'gallery'},
          {title: 'Dz gallery', value: 'dz-gallery'},
          {title: 'Museum', value: 'museum'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Location photos',
      name: 'photos',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
})
