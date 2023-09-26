import {componentsIndex} from '../GridMolecule'
import {ComponentsShape} from '../index'

type GridProps = {
  itemsPerRow: number
  wrap: boolean
  title?: string
}
type TransformToGridProps = {
  data: any[]
  gridProps: GridProps
  innerComponentType: keyof typeof componentsIndex
}

type TransformToHeroProps = {
  data: any
  heroProps: any
}

export const transformDataToGrid = ({
  data,
  gridProps,
  innerComponentType,
}: TransformToGridProps): ComponentsShape => {
  return {
    content: [],
    _type: 'grid',
    props: {
      ...gridProps,
      grid: data.map((innerData) => ({
        content: [innerData],
        props: {},
        _type: innerComponentType,
      })),
    },
  }
}

export const transformDataToHero = ({data, heroProps}: TransformToHeroProps): ComponentsShape => {
  return {
    content: data,
    _type: 'dzHero',
    props: {
      ...heroProps,
    },
  }
}
