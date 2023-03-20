import {cardMapper} from './cardMapper'
import {heroMapper} from './heroMapper'
import {imageMapper} from './imageMapper'
import {richTextMapper} from './richTextMapper'

const documentNames = ['artist', 'artwork', 'exhibition', 'book', 'press']
export const contentTransformer = (data: any) => {
  return Object.entries(data ?? {}).reduce((prev, curr) => {
    const [key, structuredData] = curr
    if (documentNames.includes(key) && Array.isArray(structuredData) && structuredData.length) {
      prev = {_type: key, ...(structuredData?.[0] ?? {})}
    }
    return prev
  }, {})
}
export const componentMapper: any = {
  dzHero: heroMapper,
  dzImage: imageMapper,
  dzCard: cardMapper,
  dzRichText: richTextMapper,
}
