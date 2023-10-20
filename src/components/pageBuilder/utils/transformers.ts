import {CardSizes} from '@zwirner/design-system'

import {
  DzGridMoleculePropsData,
  GridMoleculeItemType,
} from '@/sanity/queries/components/gridMoleculeProps'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

type TransformToGridProps = {
  data: any[]
  gridProps: Omit<DzGridMoleculePropsData, 'grid'>
  innerComponentType: GridMoleculeItemType
  cardSize?: CardSizes
}

type TransformToHeroProps = {
  data: any
  heroProps: any
}

export const transformDataToGrid = ({
  data,
  gridProps,
  innerComponentType,
  cardSize,
}: TransformToGridProps): any => {
  return {
    content: [],
    title: null,
    _type: 'grid',
    props: {
      ...gridProps,
      grid: data?.map((innerData) => ({
        content: [innerData],
        props: {cardSize} as any,
        _type: innerComponentType,
      })),
    },
  }
}

export const transformDataToHero = ({
  data,
  heroProps,
}: TransformToHeroProps): PageBuilderComponentsDataSchemaType => {
  return {
    content: data,
    title: null,
    _type: 'dzHero',
    props: {
      ...heroProps,
    },
  }
}
