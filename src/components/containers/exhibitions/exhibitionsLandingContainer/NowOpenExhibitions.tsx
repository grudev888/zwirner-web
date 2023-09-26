import {FC, useEffect, useState} from 'react'

import {ALL_LOCATIONS} from '@/common/constants/commonCopies'
import {
  findExhibitionsByCity,
  isExhibitionOpen,
} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import PageBuilder from '@/components/pageBuilder'
import {transformDataToGrid} from '@/components/pageBuilder/utils/transformers'

interface NowOpenExhibitionsProps {
  data: any
}

const PREFERRED_CITY_ORDERING = ['New York', 'Los Angeles', 'London', 'Paris', 'Hong Kong']

export const NowOpenExhibitions: FC<NowOpenExhibitionsProps> = ({data}) => {
  const [openExhibitions, setOpenExhibitions] = useState<Array<any>>([])
  const [selectedCities] = useState<Array<string>>([ALL_LOCATIONS])
  const [, setOrderedCities] = useState<Array<string>>([])
  const [, setDisabledCities] = useState<Array<string>>([])
  const [filteredExhibitions, setFilteredExhibitions] =
    useState<Array<Record<string, any>>>(openExhibitions)

  useEffect(() => {
    setOpenExhibitions((data?.exhibitions ?? []).filter(isExhibitionOpen))
  }, [data?.exhibitions])

  // Order the city pills based on custom rules
  useEffect(() => {
    let remainingCities: Array<string> = [...(data?.cities ?? [])]
    const orderedCities: Array<string> = []

    PREFERRED_CITY_ORDERING.forEach((city: string) => {
      if ((data?.cities ?? []).includes(city)) {
        orderedCities.push(city)
        remainingCities = remainingCities.filter((c) => c !== city)
      }
    })
    setOrderedCities([ALL_LOCATIONS, ...orderedCities, ...remainingCities])
  }, [data?.cities, setOrderedCities])

  // Enable/Disable the exhibitions based on which city pills are selected
  useEffect(() => {
    const enabledExhibitions =
      selectedCities.length === 1 && selectedCities[0] === ALL_LOCATIONS
        ? openExhibitions
        : selectedCities.map((city) => findExhibitionsByCity(openExhibitions, city)).flat()

    const filteredExhibitionList = openExhibitions.map((openEx) => ({
      ...openEx,
      isDisabled: !enabledExhibitions.find((ex: any) => ex._id === openEx._id),
    }))

    setFilteredExhibitions(filteredExhibitionList ?? [])
  }, [selectedCities, setFilteredExhibitions, openExhibitions, data.exhibitions])

  // Disable any city pill that does not have an exhibition location in that city
  useEffect(() => {
    const disabledCities: Array<string> = []
    ;(data?.cities ?? []).forEach((city: string) => {
      if (!(findExhibitionsByCity(openExhibitions, city).length > 0)) {
        disabledCities.push(city)
      }
    })
    setDisabledCities(disabledCities)
  }, [data?.cities, openExhibitions, setDisabledCities])

  /*
  const onClickCityPill = (city: string) => {
    if (disabledCities.includes(city)) {
      return
    }
    if (city === ALL_LOCATIONS) {
      setSelectedCities([ALL_LOCATIONS])
    } else if (selectedCities.includes(city)) {
      let newSelectedCities = selectedCities.filter((selectedCity) => selectedCity !== city)

      if (newSelectedCities.length === 0) {
        newSelectedCities = [ALL_LOCATIONS]
      }
      setSelectedCities(newSelectedCities)
    } else {
      const newSelectedCities =
        selectedCities.length === 1 && selectedCities[0] === ALL_LOCATIONS ? [] : selectedCities
      setSelectedCities([...newSelectedCities, city])
    }
  }
  */
  const dzGridPageBuilder = transformDataToGrid({
    data: filteredExhibitions,
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: 2,
      wrap: false,
      title: '',
    },
  })
  return (
    <>
      {/* City pills are currently hidden pending design decisions
      <div className={styles.locationPillsContainer}>
        {orderedCities.map((city: string) => (
          <DzPill
            key={city}
            title={city}
            variant={PILL_VARIANTS.MOBILE}
            className={styles.locationPill}
            onClickPill={() => onClickCityPill(city)}
            active={selectedCities.includes(city)}
            disabled={disabledCities.includes(city)}
          />
        ))}
      </div>
      */}
      {filteredExhibitions && dzGridPageBuilder ? (
        <PageBuilder components={[dzGridPageBuilder]} />
      ) : null}
    </>
  )
}
