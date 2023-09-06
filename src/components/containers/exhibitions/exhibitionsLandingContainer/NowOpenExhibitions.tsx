import {DzComplexGrid, DzPill, PILL_VARIANTS} from '@zwirner/design-system'
import {FC, useEffect, useState} from 'react'

import {ALL_LOCATIONS} from '@/common/constants/commonCopies'
import styles from '@/components/containers/exhibitions/exhibitionsLandingContainer/exhibitionsLandingContainer.module.css'
import {
  findExhibitionsByCity,
  isExhibitionOpen,
} from '@/components/containers/exhibitions/exhibitionsLandingContainer/utils'
import {mapCardsGrid} from '@/components/containers/pages/artists/exhibitions/mapper'

interface NowOpenExhibitionsProps {
  data: any
}

const PREFERRED_CITY_ORDERING = ['New York', 'Los Angeles', 'London', 'Paris', 'Hong Kong']

export const NowOpenExhibitions: FC<NowOpenExhibitionsProps> = ({data}) => {
  const {cities = [], exhibitions = []} = data ?? {}
  const [openExhibitions, setOpenExhibitions] = useState<Array<any>>([])
  const [selectedCities, setSelectedCities] = useState<Array<string>>([ALL_LOCATIONS])
  const [orderedCities, setOrderedCities] = useState<Array<string>>([])
  const [disabledCities, setDisabledCities] = useState<Array<string>>([])
  const [filteredExhibitions, setFilteredExhibitions] =
    useState<Array<Record<string, any>>>(openExhibitions)
  const [openExhibitionsGridData, setOpenExhibitionsGridData] = useState<{cards: Array<any>}>({
    cards: mapCardsGrid(filteredExhibitions, {enableZoom: true}),
  })

  useEffect(() => {
    setOpenExhibitions(exhibitions.filter(isExhibitionOpen))
  }, [exhibitions])

  // Order the city pills based on custom rules
  useEffect(() => {
    let remainingCities: Array<string> = [...cities]
    const orderedCities: Array<string> = []

    PREFERRED_CITY_ORDERING.forEach((city: string) => {
      if (cities.includes(city)) {
        orderedCities.push(city)
        remainingCities = remainingCities.filter((c) => c !== city)
      }
    })
    setOrderedCities([ALL_LOCATIONS, ...orderedCities, ...remainingCities])
  }, [cities, setOrderedCities])

  // Enable/Disable the exhibitions based on which city pills are selected
  useEffect(() => {
    const enabledExhibitions =
      selectedCities.length === 1 && selectedCities[0] === ALL_LOCATIONS
        ? openExhibitions
        : selectedCities.map((city) => findExhibitionsByCity(openExhibitions, city)).flat()
    const disabledExhibitions = openExhibitions.filter(
      (openEx) => !enabledExhibitions.find((ex: any) => ex._id === openEx._id)
    )
    const mapCardsGridOptions = {
      useDatePrefix: false,
      disabledIds: disabledExhibitions.map(({_id}) => _id),
    }
    setFilteredExhibitions(exhibitions)
    setOpenExhibitionsGridData({cards: mapCardsGrid(openExhibitions, mapCardsGridOptions)})
  }, [selectedCities, setFilteredExhibitions, openExhibitions, exhibitions])

  // Disable any city pill that does not have an exhibition location in that city
  useEffect(() => {
    const disabledCities: Array<string> = []

    cities.forEach((city: string) => {
      if (!(findExhibitionsByCity(openExhibitions, city).length > 0)) {
        disabledCities.push(city)
      }
    })
    setDisabledCities(disabledCities)
  }, [cities, openExhibitions, setDisabledCities])

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

  return (
    <>
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
      <DzComplexGrid {...openExhibitionsGridData} hideControls />
    </>
  )
}
