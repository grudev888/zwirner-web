import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      validation: (Rule) => Rule.max(120).error(`A summary shouldn't be more than 120 characters.`),
    }),
    defineField({
      name: 'description',
      title: 'Description, bio',
      type: 'text'
    }),
    defineField({
      name: 'picture',
      title: 'Profile picture',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'birthdate',
      type: 'date',
      title: 'Birthdate',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'deathDate',
      type: 'date',
      title: 'Death date',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Artist url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          relativeOnly: false,
          scheme: ['https', 'http', 'mailto'],
        }),
    }),
    defineField({
      title: 'Artist photos',
      name: 'photos',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      title: 'Social media',
      name: 'social',
      type: 'social',
    }),
    defineField({
      name: 'affiliation',
      type: 'boolean',
      readOnly: ({currentUser}) => {
        return !currentUser?.roles.find(({name}) => name !== 'administrator')
      },
      title: 'Affiliated to DZ',
      initialValue: false,
    }),
  ],
})
