import {DzTitleMolecule} from '@zwirner/design-system'
import Link from 'next/link'

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

  return <DzTitleMolecule {...{...mappedData, ...overrideData}} LinkElement={Link} />
}

export default DzTitle
