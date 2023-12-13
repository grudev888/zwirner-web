import useSWR from 'swr'

import {client} from '@/common/api'
import {getNewYorkTimestamp} from '@/common/utilsMappers/date.mapper'
import {env} from '@/env.mjs'

import {IFormInput, ILocation} from '../types'

const BASE_URL = (path = '', queryParams: any = null) =>
  `${env.NEXT_PUBLIC_FORMS_API}${path}${
    queryParams ? '?' + new URLSearchParams(queryParams).toString() : ''
  }`

export const useForms = () => {
  const {data, error, isLoading} = useSWR(BASE_URL('forms'))

  const addOrUpdate = async (form: IFormInput & {location: ILocation}) =>
    await client.post(BASE_URL('forms/submissions'), {
      ...form,
      timestamp: (getNewYorkTimestamp({getDate: true}) as Date).toISOString(),
    })

  return {data, error, isLoading, addOrUpdate}
}
