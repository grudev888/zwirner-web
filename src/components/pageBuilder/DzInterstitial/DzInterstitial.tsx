import {DzInterstitial as DzInterstitialMolecule} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {FC} from 'react'

import {DzInterstitialTypeProps} from '@/sanity/types'

import {dzInterstitialOverrides, interstitialMap} from './interstitialMapper'

interface DzInterstitialProps {
  data: any
  componentProps?: DzInterstitialTypeProps
}

export const DzInterstitial: FC<DzInterstitialProps> & {notContentDependant: boolean} = ({
  data,
  componentProps,
}) => {
  const router = useRouter()
  const {_type} = data ?? {}
  const mappedData = (interstitialMap?.[_type] ?? ((a: any) => ({data: a})))(data, componentProps)
  const overrideData = componentProps ? dzInterstitialOverrides(componentProps, router) : {}

  return <DzInterstitialMolecule {...{...mappedData, ...overrideData}} />
}

DzInterstitial.notContentDependant = true

export default DzInterstitial
