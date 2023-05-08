import {DzEditorial as DzEditorialMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzEditorialSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzEditorialOverrides} from './editorialMapper'

export const EDITORIAL_TEXT_TYPES = {
  PARAGRAPH: 'paragraph',
  QUOTE: 'quote',
}

export const EDITORIAL_TEXT_NAMES = [
  EDITORIAL_TEXT_TYPES.PARAGRAPH,
  EDITORIAL_TEXT_TYPES.QUOTE,
] as const

interface DzEditorialProps {
  data: any
  componentProps: DzEditorialSchemaProps
}

export const DzEditorial: FC<DzEditorialProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data, componentProps)
  const overrideData = dzEditorialOverrides(componentProps) ?? {}

  return <DzEditorialMolecule {...{...mappedData, ...overrideData}}  />
}

export default DzEditorial
