import {Fragment} from 'react'
export const FILLER_FR = <Fragment />
export const SourceElement = (externalVideo: string, type: string = 'video/mp4') => (
  <source src={externalVideo} type={type} />
)
