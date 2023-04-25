import {cardMapper} from '@/components/pageBuilder/DzCard/cardMapper'
import {editorialMapper} from '@/components/pageBuilder/DzEditorial/editorialMapper'
import {heroMapper} from '@/components/pageBuilder/DzHero/heroMapper'

//TODO add different types to the queries related to editorial
const dzInterstitialKeys = ['split']
const dzSplitKeys = ['splitType', 'reverse', 'animate']
const dzEditorialKeys = ['editorialType', 'editorialTextOverrides']
const extraInfo = [...dzEditorialKeys, ...dzSplitKeys, ...dzInterstitialKeys]
const documentNames = ['artist', 'artwork', 'exhibition', 'book', 'press']
export const contentTransformer = (data: any) => {
  return Object.entries(data ?? {}).reduce((prev, curr) => {
    const [key, structuredData] = curr
    if (documentNames.includes(key) && Array.isArray(structuredData) && structuredData.length) {
      prev = {...prev, _type: key, ...(structuredData?.[0] ?? {})}
    }
    if (extraInfo.includes(key)) {
      prev = {...prev, [key]: structuredData}
    }
    return prev
  }, {})
}
export const componentMapper: any = {
  dzHero: heroMapper,
  dzCard: cardMapper,
  dzEditorial: editorialMapper,
}
