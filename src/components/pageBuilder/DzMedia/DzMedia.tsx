import {DzCard as DzCardMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzMediaSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzMediaOverrides} from './mediaMapper'

interface DzMediaProps {
  data: any
  componentProps: DzMediaSchemaProps
}

export const DzMedia: FC<DzMediaProps> & {notContentDependant: boolean} = ({
  data,
  componentProps,
}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data, componentProps) ?? {}
  const overrideData = dzMediaOverrides(componentProps) ?? {}

  return (
    <div>
      <DzCardMolecule {...{...mappedData, ...overrideData}} />
    </div>
  )
}

DzMedia.notContentDependant = true
export default DzMedia
