import {
  DzGridMoleculePropsData,
  GridMoleculeItemType,
} from '@/sanity/queries/components/gridMoleculeProps'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

type TransformToGridProps = {
  data: any[]
  gridProps: Omit<DzGridMoleculePropsData, 'grid'>
  innerComponentType: GridMoleculeItemType
}

type TransformToHeroProps = {
  data: any
  heroProps: any
}

export const transformDataToGrid = ({
  data,
  gridProps,
  innerComponentType,
}: TransformToGridProps): any => {
  return {
    content: [],
    title: null,
    _type: 'grid',
    props: {
      ...gridProps,
      grid: data?.map((innerData) => ({
        content: [innerData],
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
