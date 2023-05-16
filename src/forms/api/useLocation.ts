import useSWR from 'swr'

import {ILocation} from '../types'

const BASE_URL = () => `/api/location`

export const useLocation = () => {
  const {data, error, isLoading} = useSWR<ILocation>(BASE_URL())

  return {data, error, isLoading}
}
