import {LinkRemovedIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export interface RedirectSchema {
  from: string,
  to: string,
}

export default defineType({
  name: 'redirect',
  type: 'document',
  icon: LinkRemovedIcon,
  title: 'Redirect',
  fields: [
    defineField({
      name: `from`,
      type: `string`,
      description: `Redirect from a "/path"`,
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (typeof value === 'undefined') {
            return true
          }

          if (value) {
            if (!value.startsWith(`/`)) {
              return `"From" path must start with "/"`
            }
          }

          return true
        }),
    }),
    defineField({
      name: `to`,
      type: `string`,
      description: `Redirect to a "/path" or "https://www.different-website.com"`,
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (typeof value === 'undefined') {
            return true
          }

          if (value) {
            if (!value.startsWith(`/`) && !value.startsWith(`https://`)) {
              return `"From" path must start with "/" or "https://"`
            }
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: `from`,
      subtitle: `to`,
    },
  },
})
