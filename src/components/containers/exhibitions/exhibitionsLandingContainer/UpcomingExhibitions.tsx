import {FC, useEffect, useState} from 'react'

import {isExhibitionUpcoming} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import PageBuilder from '@/components/pageBuilder'
import {transformDataToGrid, transformDataToHero} from '@/components/pageBuilder/utils/transformers'

export enum UpcomingMolecules {
  'DZ Hero Carousel' = 'heroCarousel',
  '2-Up Grid' = '2-up',
  '3-Up Grid' = '3-up',
}

interface UpcomingExhibitionsProps {
  data: any
}

export const UpcomingExhibitions: FC<UpcomingExhibitionsProps> = ({data}) => {
  const [upcomingExhibitions, setUpcomingExhibitions] = useState<Array<any>>([])
  const upcomingAsHero = data?.upcomingComponent === UpcomingMolecules['DZ Hero Carousel']

  useEffect(
    () =>
      setUpcomingExhibitions(
        (data?.exhibitions ?? [])
          .filter(isExhibitionUpcoming)
          .map((data: Record<string, any>) => ({...data, description: data.summary}))
      ),
    [data?.exhibitions]
  )

  const dzGridPageBuilder = transformDataToGrid({
    data: upcomingExhibitions,
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: data?.upcomingComponent === UpcomingMolecules['2-Up Grid'] ? 2 : 3,
      wrap: false,
      title: '',
      displayGridSlider: false,
      displayNumberOfItems: false,
    },
  })

  const dzHeroPageBuilder = transformDataToHero({
    data: upcomingExhibitions,
    heroProps: {},
  })

  return upcomingExhibitions?.length > 0 ? (
    <>
      {upcomingAsHero && dzHeroPageBuilder ? (
        <PageBuilder components={[dzHeroPageBuilder]} />
      ) : null}
      {!upcomingAsHero && !!data?.upcomingComponent && dzGridPageBuilder ? (
        <PageBuilder components={[dzGridPageBuilder]} />
      ) : null}
    </>
  ) : null
}
