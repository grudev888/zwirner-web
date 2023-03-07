import imageUrlBuilder from '@sanity/image-url'

import {client} from '@/sanity/client'

export const builder = imageUrlBuilder(client)
