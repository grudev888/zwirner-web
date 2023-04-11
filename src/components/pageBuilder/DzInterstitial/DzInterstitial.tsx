import {DzInterstitial as DzInterstitialMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {interstitialMap} from './interstitialMapper'

interface DzInterstitialProps {
  data: any
}

export const DzInterstitial: FC<DzInterstitialProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (interstitialMap[_type] ?? ((a: any) => ({data: a})))(data)

  return <DzInterstitialMolecule {...mappedData} />
}

export default DzInterstitial
