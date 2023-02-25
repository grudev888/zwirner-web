import {defineType} from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social media',
  type: 'object',
  fields: [
    {name: 'instagram', title: 'Instagram', type: 'string'},
    {name: 'twitter', title: 'Twitter', type: 'string'},
    {name: 'facebook', title: 'Facebook', type: 'string'},
    {name: 'youtube', title: 'Youtube', type: 'string'},
    {name: 'tiktok', title: 'Tiktok', type: 'string'},
    {name: 'twitch', title: 'Twitch', type: 'string'},
  ],
})
