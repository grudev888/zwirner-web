import { PinIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import addressType from '../objects/utils/address'

// create hours schema
export default defineType({
  name: 'location',
  title: 'Location',
  icon: PinIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'locationName',
      title: 'Name',
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
      title: 'Geo-location',
      name: 'geoLocation',
      type: 'geopoint'
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'text',
      // todo create a custom validation or custom type
      // https://www.sanity.io/docs/validation#4dc8b38bc411
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      // todo create a custom validation
      // https://www.sanity.io/docs/validation#4dc8b38bc411
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description, body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Location url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      title: 'Location type',
      name: 'locationType',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Gallery', value: 'gallery' },
          { title: 'Dz gallery', value: 'dz-gallery' },
          { title: 'Museum', value: 'museum' },
        ],
      },
    }),
    defineField({
      title: 'Location photos',
      name: 'locationPhotos',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
