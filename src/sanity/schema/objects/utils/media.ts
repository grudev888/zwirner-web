import {MEDIA_TYPES} from '@zwirner/design-system'
import {defineArrayMember, defineField} from 'sanity'

export default defineField({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      description: 'Choose between picture or video',
      options: {
        list: [
          {title: 'Image', value: MEDIA_TYPES.IMAGE},
          {title: 'Video', value: MEDIA_TYPES.VIDEO},
        ],
      },
    }),
    defineField({
      title: 'Pictures',
      name: 'pictures',
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
      options: {
        layout: 'grid',
      },
      hidden: ({parent}) => {
        return parent?.link || !parent?.type || parent?.type === MEDIA_TYPES.VIDEO
      },
    }),
    defineField({
      name: 'linkImage',
      title: 'Image Link CTA',
      type: 'link',
      description: 'Link for the image CTA',
      hidden: ({parent}) => {
        return parent?.type === MEDIA_TYPES.VIDEO || !parent?.type || parent?.pictures
      },
    }),
    defineField({
      name: 'linkVideo',
      title: 'Video Link',
      type: 'link',
      description: 'Link for the source of the video',
      hidden: ({parent}) => {
        return parent?.type === MEDIA_TYPES.IMAGE || !parent?.type
      },
    }),
  ],
})
