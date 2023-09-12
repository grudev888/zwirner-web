import {DzComplexGrid, DzHero} from '@zwirner/design-system'
import {FC, useEffect, useState} from 'react'

import {exhibitionCarouselMapper} from '@/components/containers/exhibitions/exhibitionsLandingContainer/mapper'
import {isExhibitionUpcoming} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {mapCardsGrid} from '@/components/containers/pages/artists/exhibitions/mapper'

const UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS = {
  twoUpGrid: 'twoUpGrid',
  threeUpGrid: 'threeUpGrid',
  hero: 'hero',
}

interface UpcomingExhibitionsProps {
  data: any
}

export const UpcomingExhibitions: FC<UpcomingExhibitionsProps> = ({data}) => {
  const upcomingExhibitionsComponent: keyof typeof UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS =
    data?.upcomingExhibitionsComponent
  const [upcomingExhibitions, setUpcomingExhibitions] = useState<Array<any>>([])
  const upcomingDisplayOption =
    UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS[
      upcomingExhibitionsComponent || UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS.threeUpGrid
    ]
  const upcomingExhibitionCards: any = exhibitionCarouselMapper(upcomingExhibitions)
  const upcomingExhibitionsGridCards: any = mapCardsGrid(upcomingExhibitions, {
    useDatePrefix: false,
    showLinkCTA: true,
  })

  useEffect(
    () =>
      setUpcomingExhibitions(
        (data?.exhibitions ?? [])
          .filter(isExhibitionUpcoming)
          .map((data: Record<string, any>) => ({...data, description: data.summary}))
      ),
    [data?.exhibitions]
  )

  return upcomingExhibitionCards?.length > 0 ? (
    <>
      {upcomingDisplayOption === UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS.hero && (
        <DzHero items={upcomingExhibitionCards} />
      )}

      {(upcomingDisplayOption === UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS.twoUpGrid ||
        upcomingDisplayOption === UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS.threeUpGrid) && (
        <DzComplexGrid
          hideControls
          cards={upcomingExhibitionsGridCards}
          maxItemsPerRow={
            upcomingDisplayOption === UPCOMING_EXHIBITIONS_DISPLAY_OPTIONS.twoUpGrid ? 2 : 3
          }
        />
      )}
    </>
  ) : null
}
