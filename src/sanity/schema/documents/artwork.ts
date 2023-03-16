import {ThLargeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import drawing from '../objects/artTypes/drawing'
import painting from '../objects/artTypes/painting'
import photography from '../objects/artTypes/photography'
import sculpture from '../objects/artTypes/sculpture'
import dateSelection from '../objects/utils/dateSelection'
import artistType from './artist'

// Check If we will need prefilled fields
export default defineType({
  name: 'artwork',
  title: 'Artworks',
  type: 'document',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Artist',
          to: [{type: artistType.name}],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Date',
      name: 'dateSelection',
      type: dateSelection.name,
    }),
    defineField({
      name: 'artworksEdition',
      title: 'Artworks Edition',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          title: 'Artwork',
          to: [{type: 'artwork'}],
        }),
      ],
    }),
    defineField({
      title: 'Artwork photos',
      name: 'photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
    }),
    defineField({
      title: 'Artworks Type to fill',
      name: 'artworkTypeToFill',
      type: 'array',
      of: [
        defineArrayMember({type: drawing.name}),
        defineArrayMember({type: painting.name}),
        defineArrayMember({type: photography.name}),
        defineArrayMember({type: sculpture.name}),
      ],
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Unavailable', value: 'unavailable'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {title}
    },
  },
})
