import {DzEditorial as DzEditorialMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {contentTypesMapper} from './editorialMapper'

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
}

export const DzEditorial: FC<DzEditorialProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)

  return <DzEditorialMolecule {...mappedData} />
}

export default DzEditorial
