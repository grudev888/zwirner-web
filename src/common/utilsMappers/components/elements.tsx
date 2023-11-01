import {Fragment} from 'react'
export const FILLER_FR = <Fragment />
export const SourceElement = (src: string, type: string = 'video/mp4') => (
  <source data-src={src} type={type} />
)
