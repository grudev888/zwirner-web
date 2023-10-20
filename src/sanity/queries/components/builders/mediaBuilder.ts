import {groq} from 'next-sanity'
import {z} from 'zod'

// TODO delete alts
export const mediaBuilder = groq`
  type=='Image' => {
    caption,
    type,
    "alt": image.alt,
    "image": image.asset->,
  },
  type=='Custom Video' => {
    type,
    "video": video.asset->,
  },
  type=='Video Record' => {
    type,
    "video":  videoSelectorReference.videoReference->,
    "videoType": videoSelectorReference.type
  },
  type=='Unset' => {
    type,
  },
`

export const MediaBuilderImageSchema = z.object({
  alt: z.nullable(z.string()),
  image: z.any(),
})
export const MediaBuilderCustomVideoSchema = z.object({
  video: z.any(),
})
export const MediaBuilderVideoRecordSchema = z.object({
  video: z.any(),
  videoType: z.nullable(z.string()),
})

export const MediaBuilderSchema = z.discriminatedUnion('type', [
  MediaBuilderImageSchema.extend({type: z.literal('Image'), caption: z.nullable(z.array(z.any()))}),
  MediaBuilderCustomVideoSchema.extend({type: z.literal('Custom Video')}),
  MediaBuilderVideoRecordSchema.extend({type: z.literal('Video Record')}),
  z.object({}).extend({type: z.literal('Unset')}),
])
