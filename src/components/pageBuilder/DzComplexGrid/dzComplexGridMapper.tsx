import {ColumnSpan} from '@zwirner/design-system'
import {Fragment} from 'react'

import {processDzCardData} from '../DzCard/DzCard'
import {dzMediaOverrides} from '../DzMedia/mediaMapper'

const cardDataWrapper = ({content, props}: any) => {
  const mappedResult = processDzCardData({
    data: content?.[0],
    componentProps: props,
    isSmall: false,
  })

  const {type: cardType, data} = mappedResult ?? {}
  return {...(data ?? {}), cardType}
}

const mediaCardWrapper = ({props}: any) => {
  const mappedResult = dzMediaOverrides(props)
  const {type: cardType, data} = mappedResult ?? {}
  return {...(data ?? {}), cardType}
}

export const componentsMappersForGrid: any = {
  dzCard: cardDataWrapper,
  dzMedia: mediaCardWrapper,
}

export const getRows = (numberOfSections: number): ColumnSpan | ColumnSpan[] => {
  if (!numberOfSections) return 1
  if (numberOfSections > 4) return 3
  return (12 / numberOfSections) as ColumnSpan
}

export const cardsMapper = (componentProps: any) => {
  const {
    grid = [],
    displayNumberOfItems = false,
    itemsPerRow = 1,
    displayGridSlider = false,
    artworkFilters,
  } = componentProps ?? {}

  const getColSpan = getRows(itemsPerRow ?? 0)

  const cards = grid?.map((gridItem: any) => {
    const {_type, content, props} = gridItem ?? {}
    const cardProps = {...props, cardSize: `${getColSpan}col`}

    const mapperFunction = componentsMappersForGrid?.[_type] ?? ((a: any) => a)(componentProps)
    const mappedData = mapperFunction({content, props: cardProps})
    return mappedData
  })

  const steps = displayGridSlider
    ? {}
    : {
        steps: [
          {
            id: 1,
            numberOfColumns: itemsPerRow,
            icon: <Fragment />,
          },
        ],
      }

  return {
    cards,
    displayNumberOfResults: displayNumberOfItems,
    displayFilters: artworkFilters,
    defaultStart: itemsPerRow,
    ...steps,
  }
}
