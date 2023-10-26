import {DzCard as DzCardMolecule} from '@/components/wrappers/DzCardWrapper'
import {DzMediaSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzMediaOverrides} from './mediaMapper'

type DzMediaProps = {
  data: any
  componentProps: DzMediaSchemaProps
}

export const DzMedia = ({data, componentProps}: DzMediaProps & {notContentDependant: boolean}) => {
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
