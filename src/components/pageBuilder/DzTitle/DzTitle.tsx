import {DzTitleMolecule} from '@/components/wrappers/DzTitleMoleculeWrapper'
import {DzTitleTypeProps} from '@/sanity/types'

import {dzTitleOverrides, titleMappers} from './titleMapper'

type DzTitleProps = {
  data: any
  componentProps: DzTitleTypeProps
}

export const DzTitle = ({data, componentProps}: DzTitleProps) => {
  const {_type} = data ?? {}
  const mappedData = (titleMappers[_type] ?? ((a: any) => a))(data, componentProps)
  const overrideData = dzTitleOverrides(componentProps) ?? {}

  return <DzTitleMolecule {...{...mappedData, ...overrideData}} />
}

export default DzTitle
