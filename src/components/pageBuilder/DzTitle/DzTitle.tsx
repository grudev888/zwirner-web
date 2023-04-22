import {DzTitleMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzTitleTypeProps} from '@/sanity/schema/objects/page/components/molecules/dzTitle'

import {titleMappers} from './titleMapper'

interface DzTitleProps {
  data: any
  componentProps?: DzTitleTypeProps
}

export const DzTitle: FC<DzTitleProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (titleMappers[_type] ?? ((a: any) => a))(data, componentProps)

  return <DzTitleMolecule {...mappedData} />
}

export default DzTitle
