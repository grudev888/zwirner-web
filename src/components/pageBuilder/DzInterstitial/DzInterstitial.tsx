import {DzInterstitial as DzInterstitialMolecule} from '@zwirner/design-system'
import Link from 'next/link'
import {useRouter} from 'next/router'

import {DzInterstitialTypeProps} from '@/sanity/types'

import {dzInterstitialOverrides, interstitialMap} from './interstitialMapper'

type DzInterstitialProps = {
  data: any
  componentProps?: DzInterstitialTypeProps
}

export const DzInterstitial = ({
  data,
  componentProps,
}: DzInterstitialProps & {notContentDependant: boolean}) => {
  const router = useRouter()
  const {_type} = data ?? {}
  const mappedData = (interstitialMap?.[_type] ?? ((a: any) => ({data: a})))(data, componentProps)
  const overrideData = componentProps ? dzInterstitialOverrides(componentProps, router) : {}

  return <DzInterstitialMolecule {...{...mappedData, ...overrideData}} LinkElement={Link} />
}

DzInterstitial.notContentDependant = true

export default DzInterstitial
