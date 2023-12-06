import {DzBanner} from '@zwirner/design-system'

import {DzLink} from '@/components/wrappers/DzLinkWrapper'

const DzToast = ({children}: any) => {
  return <DzBanner {...JSON.parse(children)} LinkElement={DzLink} />
}

export default DzToast
