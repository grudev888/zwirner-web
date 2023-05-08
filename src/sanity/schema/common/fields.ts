import {MasterDetailIcon} from '@sanity/icons'
import {defineField, ObjectDefinition} from 'sanity'

export const addCommonFields = (schema: ObjectDefinition) => ({
  ...schema,
  groups: [
    ...(schema.groups || []),
    {name: 'attributes', title: 'Attributes', icon: MasterDetailIcon, default: false},
  ],
  fields: [
    ...schema.fields,
    defineField({
      name: 'componentId',
      type: 'slug',
      title: 'Component id',
      description:
        'This will allow you to create an anchor on this component. Make sure this ID is unique within this page.',
      group: 'attributes',
    }),
  ],
})
