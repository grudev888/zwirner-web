import {defineField, defineType} from 'sanity'

const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1)

const socialItem = (name: string) =>
  defineField({
    name,
    title: capitalize(name),
    type: 'url',
  })

export default defineType({
  name: 'social',
  title: 'Social media',
  type: 'object',
  fields: [
    socialItem('twitter'),
    socialItem('facebook'),
    socialItem('instagram'),
    socialItem('weChat'),
  ],
})
