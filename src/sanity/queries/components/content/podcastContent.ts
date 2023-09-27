import {groq} from 'next-sanity'
import {z} from 'zod'

export const podcastContent = groq`
  _type == 'podcast' => {
    ...
  },
`

export const PodcastContentSchema = z.object({
  title: z.string(),
  subtitle: z.nullable(z.string()),
  dateSelection: z.nullable(z.any()),
  comingSoonSwitch: z.nullable(z.boolean()),
  comingSoonText: z.nullable(z.string()),
  description: z.nullable(z.array(z.any())),
  itunesUrl: z.nullable(z.string().url()),
  spotifyUrl: z.nullable(z.string().url()),
  googlePlayUrl: z.nullable(z.string().url()),
  stitcherURL: z.nullable(z.string().url()),
  iHeartUrl: z.nullable(z.string().url()),
  mp3Url: z.nullable(z.string().url()),
  transcript: z.nullable(z.any()),
})
