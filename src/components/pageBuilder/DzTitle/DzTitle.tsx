import {DzTitleMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {titleMappers} from './titleMapper'

interface DzTitleProps {
  data: any
}

export const DzTitle: FC<DzTitleProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (titleMappers[_type] ?? ((a: any) => a))(data)

  return <DzTitleMolecule {...mappedData} />
}

export default DzTitle
