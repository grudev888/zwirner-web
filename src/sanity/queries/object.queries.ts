import {groq} from 'next-sanity'

export const mediaBuilder = groq`
  type=='Image' => {
    type,
    // TODO delete alts
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
`
