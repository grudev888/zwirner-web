import {DzLogo} from '@zwirner/design-system'
import React from 'react'

interface LogoProps {}

export const Logo: React.FunctionComponent<LogoProps> = () => {
  return <DzLogo className="mx-4" url={'/'} svgProps={{
    fill: "white",
    width: 150
  }}/>
}
